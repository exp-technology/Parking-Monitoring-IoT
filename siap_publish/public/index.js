var tgl = document.getElementById("in_tanggal");
var nama = document.getElementById("in_nama");
var lama = document.getElementById("in_lama_jam");
var jamke = document.getElementById("in_jamke");
var psw = document.getElementById("in_pass");
//mendapatkan tanggal
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var dataa = 0;
if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = dd + '-' + mm + '-' + yyyy;
// document.write(today);
//tanggal inputan
tgl.value = today;



// percobaan parkir karawang 
ambill_data2();
var striing = "";
var aray1 = [];
var nomor = 0;
function ambill_data2(){
var testing =  firebase.database().ref().child("nama");

testing.once('value' ,function(datasnapshot){
	//mengambil data banyak dengan metode ForEach
		datasnapshot.forEach(function(child) {
			striing = child.key+": "+child.val();
			//aray1[nomor+1] = child.key+": "+child.val();
			aray1[nomor+1] = child.val();
			//window.alert(aray1[nomor+1]);
			nomor = nomor + 1;
		});
		/*if(aray1[0] == undefined){
		window.alert(aray1[0] + " ini dia");
		window.alert(aray1[3] + " ini dia");
		}*/
	});
} 







/////////////////////////////
ambil_data();

/* function book(){
	//getSelectedOption(lama);
	//document.write(lama.options[lama.selectedIndex].text);
	var pass = "pass";
	var pilih_jam = jamke.options[jamke.selectedIndex].text;
	var pilih_lama = lama.options[lama.selectedIndex].text;
	//pilih_jam = parseInt(pilih_jam) + 1;
	var array1 = pilih_lama.split(" ");
	
	//membuat password secara random
	var pass_jadi = Math.floor(Math.random() * 10);
	for(var a = 0; a < 5; a ++){
		pass_jadi =  pass_jadi.toString()  + Math.floor(Math.random() * 10);
	}
	
	
	// window.alert(pilih_jam);
	// window.alert(array1[0]);
	
	//cek bila sudah dipenuhi orang lain jadwalnya
	
	
	
		var referensi_mendengar =  firebase.database().ref().child("databooking").child(today);
		referensi_mendengar.once( 'value' ,function(datasnapshot){
		 
			pass = pass + pilih_jam;			 
			var angka_verif = 0;
			
			
			for (var i =1 ; i <= array1[0]; i++) 
			{
				var cek_pass = datasnapshot.child(pass).val();
				if(cek_pass == "0"){
					//window.alert("bisa");
					angka_verif+=1;
				}
				else{
					window.alert("Sepertinya pada jam tersebut sudah terisi oleh yang lain, Silahkan cari jam lain ! terima kasih :)");
					break;
					
				}
				pilih_jam = parseInt(pilih_jam) + 1;
				pass = "pass";
				pass = pass + pilih_jam;
			}
			// var lama_ke = document.getElementById("lama"+ array1[0]);
			// lama_ke.innerHTML = pilih_lama;
			var nama_pinjam = nama.value;
			var name = "nama";
			pilih_jam = jamke.options[jamke.selectedIndex].text;
			pass = "pass";
			pass = pass + pilih_jam;
			name = name + pilih_jam;
			if (angka_verif == array1[0]){
				for(var a = 1 ; a <= angka_verif; a++)
				{
					firebase.database().ref().child("databooking").child(today).child(pass).set(pass_jadi.toString());
					firebase.database().ref().child("databooking").child(today).child(name).set(nama_pinjam);
					var nama_tampil = document.getElementById(name);
					nama_tampil.innerHTML = nama_pinjam;
					pilih_jam = parseInt(pilih_jam) + 1;
					pass = "pass";
					pass = pass + pilih_jam;
					name = "nama";
					name = name + pilih_jam;
				}
				angka_verif = 0;
			}
			pilih_jam = jamke.options[jamke.selectedIndex].text;
			pass = "pass";
			pass = pass + pilih_jam;
			pass = "pass";
		});
		window.alert(pass_jadi +" Ini password kamu, tolong ingat baik baik dan silahkan screenshoot password kamu");
		
	}*/
	
	
function sub_tanggal(){
	today = tgl.value;
	
	// cek sabtu atau minggu
	var array5 = today.split("-"); 
	var bulan = parseInt(array5[1]);
    var today1 = bulan + "-" + array5[0] + "-" + array5[2];
	var d = new Date(today1);
	var n = d.getDay();
	//window.alert(today + " " + n + " " );
	// cek apabila memasukan tanggal yang salah
	 if ((array5[0] <=0 || array5[0] > 31) || (array5[1] <=0 || array5[1] >12) || (array5[2] <2019 || array5[2] > 2030)){
		window.alert("Tanggal yang anda masukan  salah");
	 }		 
	 if(array5[0] > 28 && array5[2] % 4 != 0 && array5[1] == 2){
		 	window.alert("Tanggal yang anda masukan  salah");
	 }
	if ( n == 0 || n == 6 || n == NaN){
		window.alert("Tanggal yang anda pilih adalah hari libur");
	}
	if(n == "NaN"){
		window.alert("Tidak ada hari pada tanggal tersebut");
	}
	else if (n == 1 || n == 2 || n == 3 || n == 4 || n == 5 ){
		ambil_data();
	}
	
}


function ambil_data(){
	var angka = 7;
	var kondisi = "kondisi";
	var pass = "pass";
	var nama = "nama";
	var jamm = "jamkee";
	var available = 6;
	var referensi_mendengar =  firebase.database().ref().child("dataparkir").child(today);
	referensi_mendengar.once( 'value' ,function(datasnapshot){
	 
	 
	 if(datasnapshot.exists()){
		 nomor = 1;
		 while (angka != 19){
			if (aray1[nomor] == undefined){
				break;
			}
			var syarat1 = datasnapshot.child(aray1[nomor]).child("keluar").val();

			if(syarat1 == "0"){
				var id = document.getElementById(kondisi + angka);
				id.innerHTML = "-";
			}
			else{
				var id = document.getElementById(kondisi + angka);
				id.innerHTML = syarat1;
				}
				
			var syarat2 = datasnapshot.child(aray1[nomor]).child("masuk").val();

			if(syarat2 == "0"){
				var id = document.getElementById(jamm + angka);
				id.innerHTML = "-";
			}
			else{
				var id = document.getElementById(jamm + angka);
				id.innerHTML = syarat2;
				}
				
			// cek ketersediaan di sini 
			if(syarat1 == 0 && syarat2 != 0){
				available = available - 1;
			}
			var id = document.getElementById(nama + angka);
			id.innerHTML = aray1[nomor];
			angka =  angka + 1;
			nomor = nomor + 1;
		 }
		 //window.alert( "Data Booking pada tanggal " + today);
		 window.alert( "tersedia lahar parkir : " + available + "/6");
		 dataa = available;
		 lah();
	}
	else{
		nomor  = 1 ;
		while (angka != 19){
				
				firebase.database().ref().child("dataparkir").child(today).child(aray1[nomor]).child("masuk").set("0");
				firebase.database().ref().child("dataparkir").child(today).child(aray1[nomor]).child("keluar").set("0");
				
				var id = document.getElementById(kondisi + angka);
				var id2 = document.getElementById(nama + angka);
				var id3 = document.getElementById(jamm + angka);
				id.innerHTML = "-";
				id2.innerHTML = "-";
				id3.innerHTML = "-";
				angka =  angka + 1;
				nomor = nomor + 1;
		 }
		ambil_data();
		//window.alert( ("Data Booking pada tanggal " + today));
	}
	});
	
}
function lah(){
	var id  = document.getElementById("tersediaaa");
	//var id2  = document.getElementById("dot");
	if (dataa == 0){
	//	id2.stylsheet.backgroundColor = red;
		window.alert("Parkiran Penuh");
	}
	id.innerText = dataa + "/6"; 
	
	}

/*function aktivasi(){
	var waktu = new Date();
	var dd2 = waktu.getDate();
	var mm2 = waktu.getMonth()+1; //January is 0!
	var yyyy2 = waktu.getFullYear();
	var jam = waktu.getHours() - 7;

	if(dd2<10) {
		dd2 = '0'+dd2
	} 

	if(mm2<10) {
		mm2 = '0'+mm2
	} 

	waktu = dd2 + '-' + mm2 + '-' + yyyy2;
	// var waktu = new Date();
	
	
	window.alert(jam);
	window.alert(waktu);
	
	// window.alert(jam);
	if (jam < 6 || jam>18){
		window.alert("ups anda mengkonfirmasi saat ini pada waktu yang salah");
	}
	else{
		var referensi_mendengar =  firebase.database().ref().child("databooking").child(waktu);
		referensi_mendengar.once( 'value' ,function(datasnapshot){
			var cek =  datasnapshot.child("pass"+jam).val();
			if (psw.value == cek){
				window.alert("password benar");
				firebase.database().ref().child("databooking").child(waktu).child(jam).set("1");
				document.getElementById("kondisi" + jam).innerHTML = "sedang digunakan";
				for (var c = 1 ; c <= 2; c++){
					jam = jam + 1;
					var ceki =  datasnapshot.child("pass"+jam).val();
					if(psw.value == ceki){
						window.alert("password benar");
						var ganti_kon = document.getElementById("kondisi" + jam);
						ganti_kon.innerHTML = "Sedang digunakan";
						firebase.database().ref().child("databooking").child(waktu).child(jam).set("1");
					}
					// else{
						// window.alert("password salah");
					// }
				}
			}
			else{
				window.alert("password salah");
			}
			
		});
	}
}
*/
/*
function submitClick(){
	
	window.alert("eh");
	
}*/