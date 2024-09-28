
var itemList={ "sp001":{"name":"Rainbow Crush","price":60000,"photo":"images/sanpham/Hinh-Web-rainbow-now.png"}, 
"sp002":{"name":"Cotton Candy Milk Tea","price":65000,"photo":"images/sanpham/Hinh-Web-cotton-candy-now.png"}, 
"sp003":{"name":"Trà nho","price":75000,"photo":"images/sanpham/TRA-NHO.png"}, 
"sp004":{"name":"Sunrise Milk Tea","price":80000,"photo":"images/sanpham/Hinh-Web-sunrise-milk-tea-now.png"}, 
"sp005":{"name":"Trà sữa xoài","price":62000,"photo":"images/sanpham/Mango-Milktea.png"}, 
"sp006":{"name":"Trà sữa đào","price":65000,"photo":"images/sanpham/Tra-Sua-Dao.png"}, 
"sp007":{"name":"Đá xay nho","price":88000,"photo":"images/sanpham/DA-XAY-NHO.png"}, 
"sp008":{"name":"Trà sữa bạc hà choco","price":70000,"photo":"images/sanpham/Mint-Chocolate-Milk-Tea-w-Pearl-Iced.png"}, 
"sp009":{"name":"Trà sữa dâu tằm","price":75000,"photo":"images/sanpham/Strawberry-Earl-grey-latte.png"}, 
"sp010":{"name":"Trà sữa khoai môn","price":68000,"photo":"images/sanpham/Trà-sữa-Khoai-môn-2.png"}, 
"sp011":{"name":"Trà sữa dâu Cookie","price":78000,"photo":"images/sanpham/Tra-Sua-Dau-Cookie-1.png"}, 
"sp012":{"name":"Trà sữa trân châu đen","price":55000,"photo":"images/sanpham/Trà-sữa-Trân-châu-đen-1.png"}, 
};

function addCart(code){
    var number=parseInt(document.getElementById(code).value);
    var name=itemList[code].name;
    if(number==0)
        return;
/*i. Kiểm tra sự tồn tại của mã sản phẩm trong localStorage, nếu không tồn tại thì thêm mới và thiết
lập giá trị cho mã sản phẩm*/
    if(typeof localStorage[code] === "undefined"){
        window.localStorage.setItem(code,number); 
    }
    else{
        var current=parseInt(window.localStorage.getItem(code));
/* ii. Nếu mã sản phẩm đã tồn tại thì kiểm tra tổng của số lượng sản phẩm đã đặt
và số lượng sản phẩm đặt mới có vượt quá 100 hay không*/
        if(current+number>100){
            window.localStorage.setItem(code,100);
            alert("Mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+" này.");
            return; 
        }
            else
            window.localStorage.setItem(code,current+number);
    }
    alert("Đã cập nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là: "+parseInt(window.localStorage.getItem(code))+".");
}

function openCart(){
    window.location.href = "donhang.html";
}
function showCart(){
    
    var formatter = new Intl.NumberFormat('vi-VN',{style: 'currency', currency: 'VND'});
    var container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
    container.innerHTML="";
    var sum=0;//tổng mỗi mặt hàng
    var totalPreTax=0;//tổng trước thuế
    var discountRate=getDiscountRate();//tỉ lệ khuyến mãi
    var taxRate=0.1;//tỉ lệ thuế
    var discount=0;//tiền giảm giá
    var tax=0;//tiền thuế.
    for(var i=0;i<window.localStorage.length;i++){
        if(typeof itemList[localStorage.key(i)] === "undefined")
        continue;
        var tr=document.createElement("tr");
        var photoCell=document.createElement("td");
        var nameCell=document.createElement("td");
        var priceCell=document.createElement("td");
        var numberCell=document.createElement("td");
        var sumCell=document.createElement("td");
        var removeCell=document.createElement("td");
        var removeLink=document.createElement("a");
        var item=itemList[localStorage.key(i)];
        var number=localStorage.getItem(localStorage.key(i));
        photoCell.style.textAlign="center";
        photoCell.innerHTML="<img src='"+item.photo+"' class='round-figure' width='100px'/>";
        nameCell.innerHTML=item.name;
        priceCell.innerHTML=formatter.format(item.price);
        priceCell.style.textAlign="right";
        numberCell.innerHTML=number;
        numberCell.style.textAlign="right";
        sum=number*item.price;
        sumCell.innerHTML=formatter.format(sum);
        sumCell.style.textAlign="right";
        removeLink.innerHTML="<i class='fa-solid fa-trash'></i>";
        removeLink.setAttribute("href","#");
        removeLink.setAttribute("data-code",localStorage.key(i));
        removeLink.onclick=function(){
            removeCart(this.dataset.code);
        };
        removeCell.style.textAlign="center";
        removeCell.appendChild(removeLink);
        tr.appendChild(photoCell);
        tr.appendChild(nameCell);
        tr.appendChild(numberCell);
        tr.appendChild(priceCell);
        tr.appendChild(sumCell);
        tr.appendChild(removeCell);
        container.appendChild(tr);
        totalPreTax+=sum;
    }
    var discount=totalPreTax*discountRate;
    var tax=(totalPreTax-discount)*taxRate;
    document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);
    document.getElementById("bill_tax").innerHTML=formatter.format(tax);
    document.getElementById("bill_total").innerHTML=formatter.format(totalPreTax-discount+tax);
}
function getDiscountRate()
{
    var d=new Date();//lấy ngày hiện tại của máy tính
    var weekday=d.getDay();//lấy ngày trong tuần
    var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút trong ngày.
    if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
    return 0.1;
    return 0;
}

function removeCart(code){
    if(typeof window.localStorage[code] !== "undefined"){
    //xóa sản phẩm khỏi localStorage
    window.localStorage.removeItem(code);
    //Xóa nội dung của phần thân của bảng (<tbody>)
    document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
    //Hiển thị lại nội dung của đơn hàng
    showCart();
    }
}

function dathang(){
    var total= document.getElementById("bill_total").innerHTML;
    total= parseFloat(total);
    if(total>0){
        alert('Đặt hàng thành công!');
        for(var i=1;i<=12;i++){
            if(i<10) var maSp= 'sp00'+i; 
            else var maSp= 'sp0'+i;
        removeCart(maSp)
        }
    } 
    else alert('Không có sản phẩm nào trong giỏ hàng!')
}