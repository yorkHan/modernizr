/**
 * Created by York on 2018/3/14.
 */
function convertToGS(img) {
    if(!Modernizr.canvas)return;
    img.color=img.src;
    img.grayscale=createGSCanvas(img);
    img.onmouseover=function () {
        this.src=this.color;
    }
    img.onmouseout=function () {
        this.src=this.grayscale;
    }
    img.onmouseout();
}
function createGSCanvas(img) {
    var canvas=document.createElement("canvas");
    canvas.width=img.width;
    canvas.height=img.height;

    var ctx=canvas.getContext("2d");
    ctx.drawImage(img,0,0);

    var img_data = ctx.getImageData(0,0,img.width,img.height);

    for(var i =0; i < img_data.data.length; i += 4)
    {
        var r = img_data.data[i];
        var g = img_data.data[i + 1];
        var b = img_data.data[i + 2];

        img_data.data[i] = img_data.data[i + 1] = img_data.data[i + 2] = (r + g +b)/3;
    }

    ctx.putImageData(img_data,0,0);　//返回图片内容作为新的灰度图片的源
    return canvas.toDataURL();
}
window.onload=function () {
    convertToGS(document.getElementById('avatar'));
}