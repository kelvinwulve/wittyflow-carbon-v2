import Index from "./components/Theme/Dashboard/Index";
import CampaignIndex from "./components/Theme/Messaging";
import Campaign from "./components/Theme/Messaging/Campaign";
import Signin from "./components/Theme/Auth/Signin";
import Signup from "./components/Theme/Auth/Signup";
import ForgotPassword from "./components/Theme/Auth/ForgotPassword";
import VerifyEmailPrompt from "./components/Theme/Auth/VerifyEmailPrompt";
import TokenExpired from "./components/Theme/Auth/TokenExpired";
import ResetPassword from "./components/Theme/Auth/ResetPassword";
import Recharge from "./components/Theme/Billing/Recharge";
import RechargeBundle from "./components/Theme/Billing/RechargeBundle";
import Profile from "./components/Theme/Account/Profile";
import RechargeHistory from "./components/Theme/Billing/RechargeHistory";
import RechargeChoice from "./components/Theme/Billing/RechargeChoice";
import SenderNames from "./components/Theme/Messaging/SenderNames";
import IndexPage from "./components/FrontPages/IndexPage";
import Groups from "./components/Theme/Contacts/Groups";
import Contacts from "./components/Theme/Contacts/Contacts";
import Apps from "./components/Theme/Developers/Apps";
import AppActivity from "./components/Theme/Developers/AppActivity";
import PersonalisedCampaign from "./components/Theme/Messaging/PersonalisedCampaign";
import VerifyEmail from "./components/Theme/Auth/verifyEmail";
import Users from "./components/Theme/Secure/Users/Users";
import UserMessages from "./components/Theme/Secure/Users/UserMessages";
import UserRechargeHistory from "./components/Theme/Secure/Users/UserRechargeHistory";
import AllMessages from "./components/Theme/Secure/Users/AllMessages";
import USSDApps from "./components/Theme/USSD/USSDApps";
import WithdrawalHistory from "./components/Theme/USSD/WithdrawalHistory";
import USSDSessions from "./components/Theme/USSD/USSDSessions";
import USSDPaymentHistory from "./components/Theme/USSD/USSDPaymentHistory";
import USSDTickets from "./components/Theme/USSD/USSDTickets";
import SmsOverviewCopy from "./components/Theme/Messaging/SmsOverviewCopy";
import UserMessagesCopy from "./components/Theme/Secure/Users/UserMessagesCopy";
import UserSenderNames from "./components/Theme/Secure/Users/UserSenderNames";
import UserPayments from "./components/Theme/Secure/Users/UserPayments";
import UserBundles from "./components/Theme/Messaging/Bundles/UserBundles";

var routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Index,
    layout: "/v1",
  },

  {
    path: "/",
    name: "Front Page",
    component: IndexPage,
    layout: "/",
  },
  {
    path: "/groups",
    name: "Contact Groups",
    component: Groups,
    layout: "/v1",
  },

  {
    path: "/groups/:group_uuid/contacts",
    name: "Contact in Group",
    component: Contacts,
    layout: "/v1",
  },
  {
    path: "/messaging/personalised-campaign",
    name: "Campain Builder",
    component: PersonalisedCampaign,
    layout: "/v1",
  },
  {
    path: "/messaging/campaign",
    name: "Campain Builder",
    component: CampaignIndex,
    layout: "/v1",
  },
  {
    path: "/messaging/campaign-builder",
    name: "Campain Builder",
    component: Campaign,
    layout: "/v1",
  },
  {
    path: "/messaging/sms-overview",
    name: "SMS Overview",
    component: SmsOverviewCopy,
    layout: "/v1",
  },
  {  
    // :group_uuid/contacts
    path: "/user/user_bundle_list",
    name: "SMS Overview",
    component: UserBundles,
    layout: "/v1",
  },

  {
    path: "/messaging/sendernames",
    name: "Sender Names",
    component: SenderNames,
    layout: "/v1",
  },
  {
    path: "/billing/recharge/payasyougo",
    name: "Recharge Your Account",
    component: Recharge,
    layout: "/v1",
  },
  {
    path: "/billing/recharge/bundle",
    name: "Recharge Your Account",
    component: RechargeBundle,
    layout: "/v1",
  },
  {
    path: "/billing/recharge/choice",
    name: "Recharge Your Account",
    component: RechargeChoice,
    layout: "/v1",
  },
  {
    path: "/billing/recharge/redirect",
    name: "Recharge Your Account",
    component: Recharge,
    layout: "/v1",
  },
  {
    path: "/billing/recharge/history",
    name: "Recharge History",
    component: RechargeHistory,
    layout: "/v1",
  },
  {
    path: "/account/profile",
    name: "My Profile",
    component: Profile,
    layout: "/v1",
  },

  {
    path: "/developers/apps",
    name: "Developer Apps",
    component: Apps,
    layout: "/v1",
  },
  {
    path: "/developers/apps/:app_id/activity",
    name: "Developer App Activity",
    component: AppActivity,
    layout: "/v1",
  },
  {
    path: "/ussd/home",
    name: "USSD Apps",
    component: USSDApps,
    layout: "/v1",
  },
  {
    path: "/ussd/:uuid/usersessions",
    name: "USSD Sessions",
    component: USSDSessions,
    layout: "/v1",
  },

  //AUTH ROUTES

  {
    path: "/signin",
    name: "Sign In",
    component: Signin,
    layout: "/auth",
  },

  {
    path: "/signup",
    name: "Sign Up",
    component: Signup,
    layout: "/auth",
  },

  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
    layout: "/auth",
  },
  {
    path: "/verify-email-prompt",
    name: "Forgot Password",
    component: VerifyEmailPrompt,
    layout: "/auth",
  },
  {
    path: "/verify-email/:user_id/:token",
    name: "Forgot Password",
    component: VerifyEmail,
    layout: "/auth",
  },
  {
    path: "/token-expired",
    name: "Token Expired",
    component: TokenExpired,
    layout: "/auth",
  },
  {
    path: "/reset-password/:user_id/:token",
    name: "Token Expired",
    component: ResetPassword,
    layout: "/auth",
  },

  //ADMIN SECURE ROUTES
  {
    path: "/secure/users",
    name: "System Users",
    component: Users,
    layout: "/v1",
  },
  {
    path: "/secure/users/:uuid/messages",
    name: "User Messages",
    component: UserMessages,
    layout: "/v1",
  },
  {
    path: "/secure/users/:uuid/recharges",
    name: "User RechargeHistory",
    component: UserRechargeHistory,
    layout: "/v1",
  },
  {
    path: "/secure/messages",
    name: "Users Messages",
    component: UserMessagesCopy,
    layout: "/v1"
  },
  {
    path: "/secure/sendernames",
    name: "Users SenderNames",
    component: UserSenderNames,
    layout: "/v1"
  },
  {
    path: "/secure/payments",
    name: "Users Payments",
    component: UserPayments,
    layout: "/v1"
  }
];
export default routes;


// Routes file should not be updated without prior permission