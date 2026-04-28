export const CATEGORIES = [
  {id:'birthday', name:'Hoa Sinh Nhat', color:'#f7d6df'},
  {id:'opening', name:'Hoa Khai Truong', color:'#fff0d6'},
  {id:'orchid', name:'Lan Ho Diep', color:'#ede6ff'},
  {id:'wedding', name:'Hoa Cuoi', color:'#d6f0f7'},
  {id:'condolence', name:'Hoa Tang Le', color:'#e8e8e8'},
  {id:'love', name:'Hoa Tinh Yeu', color:'#ffd6d6'},
];

export const PRODUCTS = [
  {id:1,name:'Bo Hoa Hong Do Tinh Yeu',cat:'love',price:450000,sale:380000,img:'hoa-hong',rating:4.8,reviews:124,sold:312,badge:'hot',desc:'Bo hoa hong do tuoi cao cap, 20 bong hoa hong Da Lat ket hop la xanh sang trong. Phu hop lam qua tang nguoi yeu nhan ngay Valentine, ky niem.',isNew:false},
  {id:2,name:'Gio Hoa Sinh Nhat Pastel',cat:'birthday',price:650000,sale:550000,img:'hoa-pastel',rating:4.9,reviews:89,sold:201,badge:'sale',desc:'Gio hoa sinh nhật tone pastel nhe nhang voi hoa cuc, hoa hong phan, lisianthus. Mau sac tuoi vui, thich hop cho moi lua tuoi.',isNew:false},
  {id:3,name:'Lan Ho Diep Trang Tinh Khoi',cat:'orchid',price:1200000,sale:null,img:'lan-trang',rating:5.0,reviews:56,sold:98,badge:null,desc:'Chau lan ho diep trang cao cap, 2 canh 12-15 bong. Cham soc ky luong, hoa tuoi lau 30-45 ngay. Sang trong, thanh lich.',isNew:true},
  {id:4,name:'Hoa Khai Truong May Man',cat:'opening',price:2500000,sale:2200000,img:'hoa-khai-truong',rating:4.7,reviews:43,sold:87,badge:'sale',desc:'Ke hoa khai truong 2 tang ruc ro, mang y nghia may man, thinh vuong. Ket hop hoa cuc, hong, cat tuong mau do-vang.',isNew:false},
  {id:5,name:'Bo Hoa Cuoi Co Dau',cat:'wedding',price:800000,sale:null,img:'hoa-cuoi',rating:4.9,reviews:112,sold:234,badge:'hot',desc:'Bo cam tay co dau sang trong voi hoa hong trang, baby breath, phong lan trang. Ket hop ribbon lua cao cap.',isNew:false},
  {id:6,name:'Hoa Huong Duong Ruc Ro',cat:'birthday',price:350000,sale:300000,img:'huong-duong',rating:4.6,reviews:78,sold:156,badge:'sale',desc:'Bo hoa huong duong tuoi sang, mang nang luong tich cuc. Ket hop la xanh tuoi, goi giay kraft than thien.',isNew:true},
  {id:7,name:'Gio Hoa Chia Buon',cat:'condolence',price:500000,sale:null,img:'hoa-chia-buon',rating:4.5,reviews:34,sold:67,badge:null,desc:'Gio hoa tang le trang nha, mau trang va tim nhat. The hien su ton trong va chia se noi dau voi gia dinh.',isNew:false},
  {id:8,name:'Bo Hoa Tulip Ha Lan',cat:'love',price:520000,sale:460000,img:'tulip',rating:4.8,reviews:67,sold:143,badge:'new',desc:'Bo tulip nhap khau Ha Lan du mau sac: do, vang, tim, hong. Hoa tuoi nhap ve 3 lan/tuan.',isNew:true},
  {id:9,name:'Lan Ho Diep Tim Hoang Gia',cat:'orchid',price:1500000,sale:null,img:'lan-tim',rating:4.9,reviews:29,sold:54,badge:null,desc:'Chau lan ho diep tim cao cap, 2 canh 10-12 bong. Mau tim quy phai, phu hop lam qua bieu.',isNew:true},
  {id:10,name:'Ke Hoa Khai Truong Van Phat',cat:'opening',price:3500000,sale:3000000,img:'ke-hoa',rating:4.8,reviews:21,sold:45,badge:'sale',desc:'Ke hoa khai truong cao cap 3 tang, thiet ke hoang trang. Toan hoa tuoi nhap khau, dam bao tuoi 5-7 ngay.',isNew:false},
  {id:11,name:'Hoa Hong Vang Sang Trong',cat:'love',price:680000,sale:null,img:'hong-vang',rating:4.7,reviews:45,sold:98,badge:null,desc:'Bo hoa hong vang 15 bong, tuong trung cho tinh yeu vinh cuu va su tran trong. Ket hop gypsophila trang.',isNew:false},
  {id:12,name:'Gio Hoa Sinh Nhat VIP',cat:'birthday',price:1200000,sale:980000,img:'gio-vip',rating:5.0,reviews:38,sold:72,badge:'hot',desc:'Gio hoa sinh nhat cao cap ket hop hoa va chocolate Ferrero Rocher, gau bong de thuong. Mon qua hoan hao.',isNew:false},
];

export const REVIEWS = {
  1:[{id:1,user:'Nguyen Lan Anh',stars:5,date:'2024-01-15',text:'Hoa rat dep, tuoi lau, dong goi can than. Giao nhanh trong 2h. Se ung ho dai dai!',avatar:'L'},
     {id:2,user:'Tran Minh Khoa',stars:4,date:'2024-01-10',text:'Hoa dep, mau sac chuan nhu anh. Hoi tre so voi gio hen 30p nhung thong cam duoc.',avatar:'M'}],
  3:[{id:3,user:'Pham Thu Huong',stars:5,date:'2024-01-20',text:'Lan dep tuyet voi! Mua tang sep nhan ngay khai truong, duoc khen ngoi nhieu. Rat hai long!',avatar:'H'}],
};

export const BANNERS = [
  {bg:'linear-gradient(135deg,#c84b6b,#8b2d47)',title:'Valentine 2024',sub:'Uu dai dac biet - Giam 20% tat ca hoa hong',cta:'Mua Ngay'},
  {bg:'linear-gradient(135deg,#c9973a,#8b6520)',title:'Khai Xuan Giap Thin',sub:'Mien phi giao hang cho don tu 500k',cta:'Kham Pha'},
  {bg:'linear-gradient(135deg,#4a7c59,#2d5a3a)',title:'Lan Ho Diep Moi Ve',sub:'Hang nhap khau chinh hang, gia tot nhat',cta:'Xem Ngay'},
];
