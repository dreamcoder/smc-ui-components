export const randomString = (length?: number) => {
    const tempLength = length || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < tempLength; i += 1) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

export const randomNumber = () => {
    const randomStr = Math.random().toString().substring(2, 10);
    const time = new Date().getTime().toString().substring(8);
    return Number(randomStr) + Number(time);
};

export const isFullScreen = () => {
    return !!(
        document.fullscreenElement
        || (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement
    );
};
