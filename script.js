function copyText(elementId) {
    const inputElement = document.getElementById(elementId);
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputElement.value).then(() => {
        showNotification('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Designed by:  Mauricio Bucardo
// Original image:
// https://dribbble.com/shots/5619509-Animated-Tab-Bar

"use strict"; 

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {

    menu.style.removeProperty("--timeOut");
    
    if (activeItem == item) return;
    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    
    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
    
    
}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

    item.addEventListener("click", () => clickItem(item, index));
    
})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});

// Lắng nghe sự kiện khi tất cả các phần tử HTML đã được tải
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả các button navigate và các div tương ứng
    var buttons = document.querySelectorAll(".menu__item");
    var divs = document.querySelectorAll(".content");

    // Ẩn tất cả các div, chỉ hiển thị div đầu tiên
    divs.forEach(function(div, index) {
        if (index === 0) {
            div.classList.add('show');
        } else {
            div.classList.remove('show');
        }
    });

    // Lặp qua từng button để gắn sự kiện click
    buttons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            // Ẩn tất cả các div
            divs.forEach(function(div) {
                div.classList.remove('show');
            });

            // Hiển thị div tương ứng với button được click
            divs[index].classList.add('show');
        });
    });
});
