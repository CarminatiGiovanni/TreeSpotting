function openPopup(type,title, description, author, size = undefined) {
    content = '<p>' + description + '</p><br>'
    if (size) content += '<p>Grant circa ' + size + '</p><br>';
    if (author)content += '<p>Truat dal ' + author + '</p>';
    content += '<p style="display:none" id="elementId">' + id + '</p>'; 
    content += '<p style="display:none" id="elementType">' + type + '</p>';
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupBody').innerHTML = content;
    document.getElementById('infoPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('infoPopup').style.display = 'none';
}