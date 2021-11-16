import React, { Component } from "react";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import CardHead from './ComponetHeadCard';
import Component1 from './campaignStep1';
import Component2 from './campaignStep2';
import Component3 from './campaignStep3';
import Component4 from './campaignStep4';
import { updateUser } from '../carbonActions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { post } from "../../../services/Transport";

import './static/campaign.css';
toast.configure();


const tabs = [
	{ step: 1, title: "Select Sender", desc: "Who is sending this campaign" },
	{ step: 2, title: "Select Recipients", desc: "Who is receiving this campaign" },
	{ step: 3, title: "Add Message", desc: "Compose the perfect message" },
	{ step: 4, title: "Preview & Launch", desc: "Review and Submit" }
]

const validateReceipients = receipients => {
	const valid = [];
	const inavalid = [];
	receipients.map(el => {
		if (validReceiver(trimcontact(el))) {
			valid.push(el)
		} else {
			inavalid.push(el);
		}
	})

	return { valid, inavalid }
}

const trimcontact = contact => {
	let number = contact;
	const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
	for (let i = 0; i < specialChars.length; i++) {
		number = contact.replace(new RegExp("\\" + specialChars[i], "gi"), "");
	}
	return number;
}

const validReceiver = receiver => {
	let number = parseInt(trimcontact(receiver));
	if (!isNaN(number) && receiver.length > 9 && receiver.length <= 14) {
		return true;
	} else {
		return false;
	}
}



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
			messageType: '',
			selectedItem:  {
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
			show_preview: false
		};
	}


	handleClosePreview = e => {
		this.setState({ show_preview: false });
	}

	handleOpenPreview = e => {
		this.setState({ show_preview: true });
	}

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
					message = "Alphanumeric name should not be more than 11"
					flag = true;
				} else {
					return false;
				}
			} else {
				if (name.length > 14) {
					message = "Numeric names should not be more than 14"
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
	}

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
		}
		else if (message_length > 161) {
			var newlength = Math.ceil(message_length / 153);
			this.setState({ smsPages: newlength })
		}
		return this.state.smsPages
	}

	componentDidMount() {
		document.title = "Campaign - wittyflow";
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
		this.setState({selectedItem});
	};

	handleReceipients = event => {
		const { name, value } = event.target;
		var list = [];
		const newvalue = value.replace(/(\r\n|\n|\r)/gm, ",");
		list.push(newvalue.split(","));
		// const { valid } = validateReceipients(list);
		var arrayLength = list.join(",").split(",").length;
		this.setState({
			[name]: newvalue.split(","),
			receipientsLength: arrayLength
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
		if (!smsMessage || !receipients || !selectedItem || !from) {
			NotificationManager.warning("Please fill all fields to send your message");
		} else {
			
			const payload = {
				from: from,
				type: selectedItem.value,
				message: smsMessage,
				to: receipients
			};
			//console.log("selected item payload",payload)
			if (this.props.user.balance > (this.state.smsPages * parseFloat(this.props.user.sms_rate)).toFixed(4)) {
				post('/messages/sms/campaign/bulk',
					payload, null).then(res => {
						this.setState({
							loading: false,
							currentStep: 1,
							showPreview: false,
							success: true
						});
						NotificationManager.success(res.data.message);
						this.handleCancelCampaign();
						this.props.updateUser();
						this.props.history.push('/v1/messaging/sms-overview/');
					})
					.catch(err => {
						NotificationManager.error(err.response.data.message);
						this.setState({ loading: false });
					});
			} else {
				NotificationManager.error(
					"Your balance is not enough to complete this campaign. Top up."
				);
			}
		}
	};


	handleContactsFromGroup = contacts => {
		const receipients = this.state.receipients;
		contacts.map(el => {
			receipients.push(el.msisdn);
		})
		this.setState({ receipients });
	}

	handleSubmit = event => {
		event.preventDefault();
		const { email, username, password } = this.state;
		alert(`Your registration detail: \n 
				 Email: ${email} \n 
				 Username: ${username} \n
				 Password: ${password}`);
	};

	_next1 = () => {
		let currentStep = this.state.step;
		if (currentStep === 1) {
			const { flag, message } = this.validateSenderName(this.state.from);
			if (flag) {
				NotificationManager.error(message, "Error");
			} else {
				currentStep = 2
			}
		}

		this.setState({
			step: currentStep
		});
	};

	_next2 = () => {
		let currentStep = this.state.step;
		const { valid, inavalid } = validateReceipients(this.state.receipients);
		if (currentStep === 2) {
			if (valid.length > 1000) {
				NotificationManager.warning("You can only send to a maximum of 1000 reciepients in a single campaign.");
			} else if (valid.length < 1) {
				NotificationManager.warning("Please provide at least 1 valid recipient");
			} else {
				currentStep = 3
				this.setState({
					step: currentStep,
					receipientsLength: valid.length,
					inavalid: inavalid.length,
					valid: valid.length
				})
			}
		}
		this.setState({ step: currentStep });
	}


	validateSenderName = name => {
		let sender, message, flag;
		if (name.length > 0) {
			sender = parseInt(name);
			if (isNaN(sender)) {
				if (name.length > 11) {
					message = "Alphanumeric name should not be more than 11"
					flag = true;
				} else {
					return false;
				}
			} else {
				if (name.length > 14) {
					message = "Numeric names should not be more than 14"
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
	}

	_preview = () => {
		let currentStep = this.state.step;
		if (currentStep === 3) {
			const { valid } = validateReceipients(this.state.receipients);
			currentStep = 4;
		}
		this.setState({ step: currentStep })
	};

	_prev = () => {
		let currentStep = this.state.step;
		if (currentStep === 3) {
			currentStep = 2;
		} else if (currentStep === 2) {
			currentStep = 1;
		}
		this.setState({ step: currentStep })
	};


	handleSelectSenderName = async e => {
		const { value } = e;
		await this.setState({
			from: value
		})
	}
	

	handlePreview = contact => {
		const { valid, inavalid } = validateReceipients(contact);
		const {
			smsMessage,
			from,
			selectedItem,
		} = this.state;
		this.setState({ previewing: true })
		if (valid.length > 0 && valid.length < 11) {
			const payload = {
				from: from,
				type: selectedItem.value,
				message: smsMessage,
				to: contact
			};
			post('/messages/sms/campaign/bulk', payload, null)
				.then(res => {
					this.setState({
						previewing: false,
						show_preview: false
					}, () => {
						NotificationManager.success(res.data.message);
						this.props.updateUser();
					});
				}).catch(err => {
					this.setState({ previewing: false }, () => {
						NotificationManager.error(err.response.data.message)
					});
				})
		} else if (valid.length > 10) {
			this.setState({ previewing: false })
			NotificationManager.warning("Preview can only be sent to a maximum of 10 contacts")
		} else {
			this.setState({ previewing: false })
			NotificationManager.warning("Please provide atleast a valid phone number")
		}
	}

	render() {
		const { step } = this.state;
		return <>
			<div className="row" style={{ display: 'flex', justifyContent: 'space-around', paddingRight: 7, paddingLeft: 7 }}>
				{tabs.map((el, key) => (
					<CardHead tab={step} step={el.step} title={el.title} desc={el.desc} />
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
						receipients={this.state.receipients}
						handleAddReceiver={this.handleReceipients}
						handleNext={this._next2}
						handlePrev={this._prev}
						handleContactsFromGroup={this.handleContactsFromGroup}
					/>
					<Component3
						step={step}
						handleAddMessage={this.handleChange}
						messageType={this.state.selectedItem.label}
						handleSelect={this.handleSelect}
						smsMessages={this.state.smsMessage}
						smsPages={this.state.smsPages}
						handleNext={this._preview}
						handlePrev={this._prev}
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
		</>;
	}
}

const mapStateToProps = state => {
	return {
		...state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateUser: () => dispatch(updateUser())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
