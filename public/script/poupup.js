function openPopup(title, description, author, size = undefined) {
    content = '<p>' + description + '</p><br>'
    if (size) content += '<p>Size: ' + size + '</p><br>';
    content += '<p>Author: ' + author + '</p>';
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupBody').innerHTML = content;
    document.getElementById('infoPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('infoPopup').style.display = 'none';
}