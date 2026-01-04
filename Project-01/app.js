// alert();

function generatorQR(){
    const qrText = document.getElementById('qrText').value.trim();
    const qrImage = document.getElementById('qrImage');
    const downloadBTN = document.getElementById('downloadBTN');
    

    if(qrText == ''){
        alert('Enter Valid Text or URL');
        return;
    }

    const apiURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;

    qrImage.src = apiURL;
    qrImage.style.display = 'block';

    qrImage.onload = () => {
        downloadBTN.href = apiURL;
        downloadBTN.style.display = 'inline-block';
    }
}