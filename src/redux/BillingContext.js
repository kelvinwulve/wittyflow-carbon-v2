import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationManager } from "react-notifications";
import { post } from "../services/Transport";

export const BillingContext = createContext();

export default ({ children }) => {
  const {
    state: {
      auth: { user, settings },
    },
  } = useContext(AuthContext);

  const [amount, setAmount] = useState(0);
  const [transaction_fee, settransaction_fee] = useState(0);
  const [sms_credit, setsms_credit] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentType, setpaymentType] = useState("");
  const [redirectUrl,setRedirectUrl] = useState("")
  const [side,setSide] = useState(false)
  const [invoiceSuccess,setInvoiceSuccess] = useState(false)
  const [invoiceId,setInvoiceId] = useState('')



  // handleCheckout for bundle
  const handlePayment = (e) => {
    
    if (!chosen) {
      NotificationManager.warning("Please select a bundle");
      setLoading(false);
      return;
    }

    if (!paymentType) {
      NotificationManager.warning("Please select a payment method");
      setLoading(false);
      return;
    }
    console.log("amount paymenttype",amount,paymentType)
    setLoading(true);

    post("/billing/invoices/create", {
      amount,
     channel: paymentType,
    })
      .then((res) => {
        // alert(JSON.stringify(res.data.data));
        //console.log("response",res)
        if (res.data.status === "success") {
          setLoading(false);
          setRedirectUrl(res.data.data.redirect_url) 
          setInvoiceId(res.data.data.invoice_id)
          setSide(false)
          setInvoiceSuccess(true)
          // this.setState({
          //   url: res.data.data.redirect_url,
          //   invoice_success: true,
          //   side: false,
          //   loading: false,
          // });
        } else {
          setLoading(false);
          setSide(false)
          NotificationManager.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          NotificationManager.error(err.response.data.message);
        }
        setLoading(false);
        setSide(false)
        //this.setState({ loading: false, side: true });
      });
  };

  return (
    <BillingContext.Provider
      value={{
        amount,
        setAmount,
        user,
        settings,
        transaction_fee,
        settransaction_fee,
        sms_credit,
        setsms_credit,
        chosen,
        setChosen,
        handlePayment,
        setpaymentType,
        loading,
        paymentType,
        redirectUrl,
        side,
        invoiceSuccess,
        setInvoiceSuccess,
        setSide,
        invoiceId
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};
