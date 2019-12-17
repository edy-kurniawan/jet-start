import {JetView} from "webix-jet";
import jendelaMahasiswa from "views/jendelaMahasiswa";
export default class Mahasiswa extends JetView{
 //KONFIGURASI TAMPILAN
 config(){
   var header = { type:"header", template:"Master Mahasiswa" };
   var tombol = { view:"toolbar", cols:[
   { view:"button", value:"Tambah", id:"tambahMahasiswa", width:100, click:this.tambah},
   { view:"button", value:"Ubah", id:"ubahMahasiswa", width:100, click:this.ubah},
   {},
   { view:"button", value:"Hapus", id:"hapusMahasiswa", width:100, click:this.hapus},
   { view:"button", value:"Refresh", id:"refreshMahasiswa", width:100, click:this.segarkan},
   ]};
   var tabel = {
       view:"datatable",
       select:true,
       id:"tabelMahasiswa",
       columns:[
       { id:"NIM", header:"NIM", width:120},
       { id:"Nama", header:"Nama", fillspace:true},
       ]
   }; 
   var ui = { rows:[header, tombol, tabel]};
 return ui; //tampilkan variabel ui
};
 //INISIALISASI AWAL
 init(view){
   this.jendelaMahasiswa = this.ui(jendelaMahasiswa);
};
 //DIJALANKAN SETELAH TAMPILAN WEB SELESAI
 ready(){
   this.segarkan();
   $$("simpanMahasiswa").attachEvent("onItemClick", this.simpan);
};
 //REFRESH DATATABLE
 segarkan() {
   $$("tabelMahasiswa").clearAll();
   $$("tabelMahasiswa").load("http://localhost:3000/mhs");
   $$('jendelaMahasiswa').hide();
}
 //TAMPIL WINDOW DAN FORM DIBERSIHKAN
 tambah() {
   $$("jendelaMahasiswa").show();
   $$("formMahasiswa").clear();
   $$("formMahasiswa").setValues({aksi:"tambah"});
   $$("NIMMahasiswa").enable();
};
 //CEK APAKAH ADA DATA YANG DIPILIH KEMUDIAN TAMPIL WINDOW DAN FORM DIISI DENGAN DATA YANG DIPILIH
 ubah() {
   if ($$("tabelMahasiswa").getSelectedId()!=null) {
       var dipilih= $$("tabelMahasiswa").getSelectedItem();
       dipilih.aksi="ubah";
       $$("formMahasiswa").setValues(dipilih);
       $$("jendelaMahasiswa").show();
       $$("NIMMahasiswa").disable();
   } else {
       webix.alert("Tidak Ada Data Yang Dipilih");
   }
}; 
 //AKSI TOMBOL SIMPAN
 simpan() {
   if ($$('formMahasiswa').validate()) {
       var dataKirim = $$("formMahasiswa").getValues();
       if (dataKirim.aksi=="tambah") {
           webix.ajax().post("http://localhost:3000/mhs", dataKirim)
           .then(function(hasil){
               webix.message("Berhasil Tambah");
               $$("tabelMahasiswa").clearAll();
               $$("tabelMahasiswa").load("http://localhost:3000/mhs");
               $$('jendelaMahasiswa').hide();
           })
           .fail(function(salah){
               webix.alert("Gagal Tambah");
           });
       } else {
           webix.ajax().put("http://localhost:3000/mhs", dataKirim)
           .then(function(hasil){
               webix.message("Berhasil Ubah");
               $$("tabelMahasiswa").clearAll();
               $$("tabelMahasiswa").load("http://localhost:3000/mhs");
               $$('jendelaMahasiswa').hide();
           })
           .fail(function(salah){
               webix.alert("Gagal Ubah");
           });
       }
   }
}; 
 //AKSI TOMBOL HAPUS
 hapus() {
   if ($$("tabelMahasiswa").getSelectedId()!=null) {
       webix.confirm({
           title:"Konfirmasi",
           ok:"Ya",
           cancel:"Tidak",
           text:"Anda Yakin Ingin Menghapus Data Ini ?",
           callback:function(jwb){
               if (jwb) {
                   var dataKirim= $$("tabelMahasiswa").getSelectedItem();
                   webix.ajax().del("http://localhost:3000/mhs", dataKirim)
                   .then(function(hasil){
                       webix.message("Berhasil Hapus");
                       $$("tabelMahasiswa").clearAll();
                       $$("tabelMahasiswa").load("http://localhost:3000/mhs");
                       $$('jendelaMahasiswa').hide();
                   })
                   .fail(function(salah){
                       webix.alert("Gagal Hapus");
                   });
               }
           }
       });
   } else {
       webix.alert("Tidak ada data dipilih");
   }
};
} 