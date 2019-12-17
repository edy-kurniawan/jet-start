var form = {
   view:"form",
   id:"formMahasiswa",
   elementsConfig:{ labelPosition:"top"},
   elements: [
   { view:"text", label:"NIM", id:"nimMahasiswa", name:"NIM", invalidMessage: "Wajib Diisi", required:true, },
   { view:"text", label:"Nama", name:"Nama", invalidMessage: "Wajib Diisi", required:true, },
   { cols:[
       {},
       { view:"button",id:"simpanMahasiswa", label:"Simpan", type:"form", width:100 },
       {}
       ]}
       ]
   };
   var jendelaMahasiswa = {
       view:"window",
       id:"jendelaMahasiswa",
       width:500,
       height:400,
       position:"center",
       modal:true,
       move:true,
       close:true,
       head: "Form Mahasiswa",
       body:form
   };
   export default jendelaMahasiswa; 