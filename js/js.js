/**
 * Created by 云 on 2018/7/11.
 */

/**
 * Created by 云 on 2018/3/27.
 */


// 解决scroll的兼容问题
function scroll() {
    // return{
    //     "top": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
    //     "left": window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    // };

    return {
        "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
        "left":  window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    };

}

// 动画纵向移动

function animate(ele,target){
    clearInterval(ele.timer);
    var speed = target>ele.offsetLeft?10:-10;
    ele.timer = setInterval(function () {
        var val = target - ele.offsetLeft;
        ele.style.left = ele.offsetLeft + speed + "px";
        if(Math.abs(val)<Math.abs(speed)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },10)
}

function  show(ele) {
    ele.style.display="block";

}

function  hide(ele) {
    ele.style.display="none";

}
//  css3写的自动播放
// function autoPlay(ele,index) {
//        var index;
//        var target;
//        if(index){
//            index=index;
//        }else { index=0;}
//        viewUl.style.transition='0.5s all 1s';
//        ele.timer=setInterval(function () {
//            index++;
//            if(index==liArr.length){
//                index=0;
//                ele.style.transition='0s all 1s';
//                ele.style.transform='translateX(0)';
//            }
// //            viewUl.style.transition='0.5s all 0s';
//            ele.style.transform='translateX('+index*liWidth*-1+'px)';
//            console.log(ele.offsetLeft);
//        },1500)
//    }

var navLiArr=$('.nav-left li');
var view = document.querySelector('#view');
var headerMain = document.querySelector('.header-main');
var viewUl = document.querySelector('#view ul');
var liArr = viewUl.children;
var liWidth = liArr[0].offsetWidth;
var arrowLeft = document.querySelector('.arrow-left');
var arrowRight = document.querySelector('.arrow-right');
var indexLiArr = document.querySelectorAll('.index li');
var indexUl = document.querySelectorAll('.index');




for (var i = 0; i < navLiArr.length; i++) {
    navLiArr[i].onclick =function () {
        for (var j = 0; j < navLiArr.length; j++) {
            navLiArr[j].classList.remove('active')
        }
        this.classList.add('active');
    }
}
    //复制第一张图添加到ul最后
    // var ulNewLi =viewUl.children[0].cloneNode(true);
    // viewUl.appendChild(ulNewLi);

//点击index li 高亮显示  并移动相应的img
for (var i = 0; i < indexLiArr.length; i++) {
    indexLiArr[i].index=i;
    indexLiArr[i].onmouseover = function () {
        for (var j = 0; j < indexLiArr.length; j++) {
           indexLiArr[j].classList.remove('current');
        }
        this.classList.add('current');

    //    记录key 和circle
        key=circle= this.index;

    //    移动盒子
        animate(viewUl,-this.index*liWidth);
    }
}


//    自动播放
//定义计数器记录img 和下面的小圆圈
var key = 0;
var circle = 0;
function  autoPlay() {
    key++;
    if(key>indexLiArr.length-1){
        viewUl.style.left=0;
        key=0;
    }
    animate(viewUl,-key*liWidth);
//    小圆圈
    circle++;
    if(circle>indexLiArr.length-1){
        circle=0;
    }
    for (var i = 0; i < indexLiArr.length; i++) {
        indexLiArr[i].classList.remove('current');
    }
    indexLiArr[circle].classList.add('current');
}


var timer;


headerMain.onmouseover=function () {
    clearInterval(timer);
    show(arrowLeft);
    show(arrowRight);
};

headerMain.onmouseout=function () {
    hide(arrowLeft);
    hide(arrowRight);
    timer=setInterval(autoPlay,3500);
};

//点击左边的盒子
arrowLeft.onclick=function () {
    key--;
    if(key<0){
        viewUl.style.left = -liWidth*(indexLiArr.length-1)+"px";
        key=indexLiArr.length-1;
        // alert('到头了');
    }
    animate(viewUl,-key*liWidth);
//    小圆圈
    circle--;
    if(circle<0){
        circle=indexLiArr.length-1;
    }
    for (var i = 0; i < indexLiArr.length; i++) {
        indexLiArr[i].classList.remove('current');
    }
    indexLiArr[circle].classList.add('current');
};

//右边
arrowRight.onclick =function () {
    if(key>indexLiArr.length-1){
        alert('到头了');
    }
    autoPlay();
};


//点击登录显示登录页面

var loginBtn= document.querySelector('.nav .login');
var loginPage=document.querySelector('.background');
var  closeLogin=document.querySelector('.background .close');

loginBtn.onclick=function () {
    loginPage.style.display='block';

};

closeLogin.onclick=function () {
    loginPage.style.display='none';
}
// console.log(loginBtn);



// var str = ''