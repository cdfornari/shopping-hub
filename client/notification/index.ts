import Swal from 'sweetalert2';

export const Notification = (isDark?: boolean) => {
    return Swal.mixin({
        toast: true,
        position: 'top-right',
        customClass: {
        popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: isDark ? '#1e1e1e' : '#fff',
        color: isDark ? '#fff' : '#000',
    })
}