//הפונקציה שמופעלת לאחר טעינת העמוד
window.addEventListener("DOMContentLoaded", function () {
    const status = document.querySelector('#status'); //שליפת אלמנט הסטטוס
    const mapLink = document.querySelector('#map-link'); //שליפת הקישור למפה
    const iframemap = document.getElementById('iframe'); //שליפת אלמנט הצגת המפה
    const resultPara = document.querySelector('.result'); //תוצאת השיתוף

    const locateBtn = document.getElementById("find-me"); //שליפת כפתור מציאת המיקום
    const shareBtn = document.getElementById("shareBtn"); //שליפת כפתור השיתוף

    locateBtn.addEventListener("click", geoFindMe);
    shareBtn.addEventListener("click", share);

    //פונקציית מציאת המיקום
    function geoFindMe() {
        mapLink.href = ''; //איפוס הקישור למפה
        mapLink.textContent = ''; //איפוס טקסט המפה

        //בדיקה האם הדפדפן תומך ביכולת מציאת המיקום
        if (!navigator.geolocation) {
            status.textContent = 'מציאת מיקום אינה נתמכת במכשירך';
        } else {
            status.textContent = 'מאתר את מיקומך...';
            navigator.geolocation.getCurrentPosition(success, error);
        }

        //במקרה של הצלחה
        function success(position) {
            //חילוץ קווי הגובה והרוחב ושמירתם למשתנים
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            status.textContent = ''; //איפוס סטטוס החיפוש
            mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`; //הכנסת הקישור למיקום לתגית הקישור
            mapLink.textContent = `קו רוחב: ${latitude} °, קו אורך: ${longitude} °`; //הכנסת התוכן לתגית הקישור

            iframemap.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`; //הזנת המקור להצגת האייפריים
            iframemap.classList.remove("d-none"); //הצגת האייפריים
            shareBtn.classList.remove("disabled"); //ביטול איפרור כפתור השיתוף
        }

        //במקרה של אי הצלחה
        function error() {
            status.textContent = 'כשל במציאת המיקום';
        }

    }

    //פונקציית השיתוף
    async function share() {

        //התוכן המשותף
        const shareData = {
            title: 'קישור למיקום שלי',
            text: 'המיקום שלי',
            url: mapLink.href
        }

        //פתיחת חלון השיתוף
        try {
            await navigator.share(shareData);
            resultPara.textContent = 'המיקום שותף בהצלחה';
        } catch (err) {
            resultPara.textContent = `שגיאה: ${err}`;
        }

    }
})


