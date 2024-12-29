function openPopup(title, content) {
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupBody').innerHTML = content;
    document.getElementById('infoPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('infoPopup').style.display = 'none';
}