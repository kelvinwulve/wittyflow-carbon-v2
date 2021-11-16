import 'izitoast/dist/css/iziToast.min.css'
// import iZtoast from 'izitoast'
import { toast } from 'react-toastify';

// const Toast = {
//     error: (message, title = 'Error') => {
//         return iZtoast.error({
//             title: title,
//             message: message,
//             position: 'topCenter',
//             maxWidth: '400px'
//         });

//         // iZtoast.error()
//     },
//     success: (message, title = 'Success') => {
//         return iZtoast.success({
//             title: title,
//             message: message,
//             position: 'topCenter'
//         });
//     }
// };

// export default toast;


const Toast = {
    error: (message, title= 'Error') => toast.error(title, message),
    success: (message, title = 'Success') => toast.success(title,message)
}

export default Toast;