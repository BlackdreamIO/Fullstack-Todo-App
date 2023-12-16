import toast from 'react-hot-toast';


export const InfoNotification = ({message='', style, icon}) => toast.success(message, {
    duration:2000,
    icon: icon,
    position:'top-right',
    style : {
        backgroundColor : 'rgb(10,10,10)',
        border : "1px solid rgb(150,150,150)",
        color : "white"
    }
});

export const ErrorNotification = ({message='', icon}) => toast.error(message, {
    duration:1500,
    icon: icon,
    position:'top-right',
    style:{
        background:'#f83e4b',
        color: 'white',
        padding : '0.5%'
    }
})