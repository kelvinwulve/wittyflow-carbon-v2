import React, { Component } from "react";
import { connect } from "react-redux";
import CardHead from "./CampaignHead";
import Component1 from "./Campaign1";
import Component2 from "./Campaign2";
import Component3 from "./Campaign3";
import Component4 from "./Campaign4";
import { updateUser } from "../../carbonActions";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { post } from "../../../../services/Transport";
import XLSX from "xlsx";
import { get_cols, buildMessages } from "./getColumns";

import "../static/campaign.css";

const tabs = [
  { step: 1, title: "Select Sender", desc: "Who is sending this campaign" },
  {
    step: 2,
    title: "Upload Recipients' Data",
    desc: "Who is receiving and what you are sending"
  },
  { step: 3, title: "Add Message", desc: "Compose the perfect message" },
  { step: 4, title: "Preview & Launch", desc: "Review and Submit" }
];

const getPages = number => {
  return Math.ceil(number / 160);
};

const validateReceipients = receipients => {
  const valid = [];
  const inavalid = [];
  receipients.map(el => {
    if (validReceiver(trimcontact(el))) {
      valid.push(el);
    } else {
      inavalid.push(el);
    }
  });

  return { valid, inavalid };
};

const validateReceipientsList = receipients => {
  const valid = [];
  const inavalid = [];
  receipients.map(el => {
    if (validReceiver(trimcontact(el))) {
      valid.push(el);
    } else {
      inavalid.push(el);
    }
  });

  return { valid, inavalid };
};

const trimcontact = contact => {
  let number = contact.toString();
 // console.log(number);
  const specialChars = "!@#$^&%*()+=-[]/{}|:<>?,.";
  for (let i = 0; i < specialChars.length; i++) {
    number = number.replace(new RegExp("\\" + specialChars[i], "gi"), "");
  }
  return number;
};

const validReceiver = receiver => {
  let number = parseInt(trimcontact(receiver));
  if (!isNaN(number) && receiver.length > 9 && receiver.length <= 14) {
    return true;
  } else {
    return false;
  }
};

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      email: "",
      username: "",
      password: "",
      smsMessage: "",
      receipients: [],
      receipientsLength: 0,
      from: "",
      messageType: 1,
      selectedItem: {
        label:"Plain Message",
        value:1,
        },
      smsPages: 0,
      loading: false,
      showPreview: false,
      success: false,
      valid: 0,
      invalid: 0,
      previewing: false,
      show_preview: false,
      file: {},
      data: [],
      cols: [],
      showModal: false,
      messages: [],
      totalCost: 0
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  //Component 2

  handleFileChange(e) {
    const files = e.target.files;
    if (files && files[0]) {
      this.setState({ file: files[0] }, () => {
        this.handleFile();
      });
    }
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      this.setState({ data: data, cols: get_cols(data[0]) }, () => {
        if (this.state.cols.length > 5) {
          NotificationManager.warning(
            "Please provide an excel sheet with only 5 columns"
          );
        } else if (this.state.cols.length > 0 && this.state.cols.length < 6) {
          this.setState({ showModal: true });
        } else {
          NotificationManager.warning(
            "Please provide us with the recipients column. Make it the first"
          );
        }
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  handleCloseShowModal = e => {
    this.setState({ showModal: false });
  };

  handleClosePreview = e => {
    this.setState({ show_preview: false });
  };

  handleOpenPreview = e => {
    this.setState({ show_preview: true });
  };

  handleCancelCampaign = () => {
    this.setState({
      smsMessage: "",
      smsPages: 0,
      from: "",
      receipients: [],
      receipientsLength: 0,
      messageType: 1,
      showPreview: false,
      step: 1
    });
  };

  validateSenderName = name => {
    let sender, message, flag;
    if (name.length > 0) {
      sender = parseInt(name);
      if (isNaN(sender)) {
        if (name.length > 11) {
          message = "Alphanumeric name should not be more than 11";
          flag = true;
        } else {
          return false;
        }
      } else {
        if (name.length > 14) {
          message = "Numeric names should not be more than 14";
          flag = true;
        }
      }
    } else {
      message = "Provide a valid sender name";
      flag = true;
    }
    return {
      flag,
      message
    };
  };

  validateStep2 = () => {
    const { currentStep, from, selectedItem, receipientsLength } = this.state;
    if (currentStep === 2) {
      if (
        from.length > 0 &&
        receipientsLength > 0 &&
        Object.keys(selectedItem).keys !== 0
      ) {
        return true;
      }
    }
    return false;
  };

  smsPagesCount = () => {
    let message_length = this.state.smsMessage.length;

    if (message_length <= 161) {
      this.setState({ smsPages: 1 });
    } else if (message_length > 161) {
      var newlength = Math.ceil(message_length / 153);
      this.setState({ smsPages: newlength });
    }
    return this.state.smsPages;
  };

  componentDidMount() {
    document.title = "Campaign - wittyflow";
    this.props.updateUser();
  }

  handleChange = event => {
    const { name, value } = event.target;
    //this.smsPagesCount();
    this.setState({
      [name]: value
    },this.smsPagesCount);
  };

  handleSelect = selectedItem => {
    //console.log(selectedItem);
    this.setState({
      selectedItem
    });
  };

  launchCampaign = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const {
      smsMessage,
      receipients,
      from,
      messageType,
      selectedItem
    } = this.state;
    if (!smsMessage || !selectedItem || !from) {
      NotificationManager.warning(
        "Please fill all fields to send your message"
      );
    } else {
      const payload = {
        from: from,
        type: selectedItem.value,
        data: this.state.messages
      };
      console.log(payload);
      //   alert(JSON.stringify(payload))
      if (this.props.user.balance > this.state.totalCost) {
        post(
          "/messages/sms/campaign/personalized",
          JSON.stringify(payload),
          null
        )
          .then(res => {
            this.setState({
              loading: false,
              currentStep: 1,
              showPreview: false,
              success: true
            });
            NotificationManager.success(res.data.message);
            this.handleCancelCampaign();
            this.props.updateUser();
            this.props.history.push("/v1/messaging/sms-overview/");
          })
          .catch(err => {
            NotificationManager.error(err.response.data.message);
            // alert(JSON.stringify(err.response.data))
            this.setState({ loading: false });
          });
      } else {
        NotificationManager.error(
          "Your balance is not enough to complete this campaign. Top up."
        );
      }
    }
  };

  handleClicked = e => {
    this.setState({
      file: null
    });
  };

  _next1 = () => {
    let currentStep = this.state.step;
    if (currentStep === 1) {
      const { flag, message } = this.validateSenderName(this.state.from);
      if (flag) {
        NotificationManager.error(message, "Error");
      } else {
        currentStep = 2;
      }
    }

    this.setState({
      step: currentStep
    });
  };

  _next2 = () => {
    let currentStep = this.state.step;
    if (currentStep === 2) {
      if (this.state.data.length < 1) {
        NotificationManager.warning("Please upload an excel file");
      } else {
        currentStep = 3;
        this.setState(
          {
            step: currentStep,
            receipientsLength: this.state.data.length
          },
          () => {
            const receps = [];
            this.state.data.map(el => {
              receps.push(el[this.state.cols[0]]);
            });
            //create

            const { valid, inavalid } = validateReceipientsList(receps);
            this.setState({
              valid: valid.length,
              invalid: inavalid.length,
              receipients: valid
            });
          }
        );
      }
    }
    this.setState({ step: currentStep });
  };

  handleItemClicked = item => {
    let message = this.state.smsMessage;
    message = message.trim() + " {" + item.trim() + "}";
    this.setState({ smsMessage: message });
  };

  validateSenderName = name => {
    let sender, message, flag;
    if (name.length > 0) {
      sender = parseInt(name);
      if (isNaN(sender)) {
        if (name.length > 11) {
          message = "Alphanumeric name should not be more than 11";
          flag = true;
        } else {
          return false;
        }
      } else {
        if (name.length > 14) {
          message = "Numeric names should not be more than 14";
          flag = true;
        }
      }
    } else {
      message = "Provide a valid sender name";
      flag = true;
    }
    return {
      flag,
      message
    };
  };

  _preview = () => {
    let currentStep = this.state.step;
    if (currentStep === 3) {
      currentStep = 4;
    }
    const messages = buildMessages(
      this.state.cols,
      this.state.data,
      this.state.smsMessage
    );
    //calculate cost
    let campaignCost = 0;
    messages.forEach((message, index) => {
      campaignCost += getPages(message.length) * this.props.user.sms_rate;
      message.message.trim();
      message.length = null;
    });
    this.setState(
      { step: currentStep, messages, totalCost: campaignCost },
      () => {
        console.log(messages);
      }
    );
  };

  _prev = () => {
    let currentStep = this.state.step;
    if (currentStep === 3) {
      currentStep = 2;
    } else if (currentStep === 2) {
      currentStep = 1;
    }
    this.setState({ step: currentStep });
  };

  handleSelectSenderName = async e =>{
		const { value } = e;
		await this.setState({
			from: value
		})
	}

  handlePreview = contact => {
    const { valid, inavalid } = validateReceipients(contact);
    const { messages, from, selectedItem } = this.state;
    this.setState({ previewing: true });
    if (valid.length > 0 && valid.length < 11) {
      const payload = {
        from: from,
        type: selectedItem.value,
        message: messages[0].message,
        to: contact
      };
      post("/messages/sms/campaign/bulk", payload, null)
        .then(res => {
          this.setState(
            {
              previewing: false,
              show_preview: false
            },
            () => {
              NotificationManager.success(res.data.message);
              this.props.updateUser();
            }
          );
        })
        .catch(err => {
          this.setState({ previewing: false }, () => {
            NotificationManager.error(err.response.data.message);
          });
        });
    } else if (valid.length > 10) {
      this.setState({ previewing: false });
      NotificationManager.warning(
        "Preview can only be sent to a maximum of 10 contacts"
      );
    } else {
      this.setState({ previewing: false });
      NotificationManager.warning(
        "Please provide atleast a valid phone number"
      );
    }
  };

  render() {
    const { step } = this.state;
    return (
      <>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingRight: 7,
            paddingLeft: 7
          }}
        >
          {tabs.map((el, key) => (
            <CardHead
              tab={step}
              step={el.step}
              title={el.title}
              desc={el.desc}
            />
          ))}
        </div>

        <div class="kt-wizard-v4">
          {/*end: Form Wizard Nav */}
          <div class="kt-portlet">
            <Component1
              step={step}
              from={this.state.from}
              handleSelectSender={this.handleSelectSenderName}
              handleNext={this._next1}
              handlePrev={this._prev}
            />
            <Component2
              step={step}
              data={this.state.data}
              cols={this.state.cols}
              showModal={this.state.showModal}
              handleFileChange={this.handleFileChange}
              handleNext={this._next2}
              handlePrev={this._prev}
              handleClicked={this.handleClicked}
              handleCloseShowModal={this.handleCloseShowModal}
            />
            <Component3
              step={step}
              messageType={this.state.selectedItem.label}
				  		handleSelect={this.handleSelect}
              handleAddMessage={this.handleChange}
              smsMessages={this.state.smsMessage}
              cols={this.state.cols}
              smsPages={this.state.smsPages}
              handleNext={this._preview}
              handlePrev={this._prev}
              handleItemClicked={this.handleItemClicked}
            />
            <Component4
              step={step}
              data={this.state}
              user={this.props.user}
              handleNext={this.launchCampaign}
              handlePrev={this.handleCancelCampaign}
              handlePreview={this.handlePreview}
              handleOpenPreview={this.handleOpenPreview}
              handleClosePreview={this.handleClosePreview}
            />
          </div>
        </div>
        <NotificationContainer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: () => dispatch(updateUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
