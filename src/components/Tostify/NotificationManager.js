import toast from 'react-hot-toast';

export const InfoNotification = ({message='', style}) => toast.success(message, {
    duration:2000,
    icon:'',
    position:'top-right',
    style: style
});

export const ErrorNotification = ({message=''}) => toast.error(message, {
    duration:1500,
    icon:'',
    position:'top-right',
    style:{
        background:'#f83e4b',
        color: 'white'
    }
})