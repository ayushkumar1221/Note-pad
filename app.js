const addBtn = document.querySelector("#addBtn");

const main = document.querySelector("#main");

//FUNCTION OF SAVENOTES

// ABOUT FUNCTION OF SAVENOTES:-
//{PHLE NOTES KE HELP SE NOTE KA ALL TO ALL TEXTAREA KO SELECT KIYA FIR DATA NAME KA EMPTY ARRAY BNAYA AUR NOTES KE UPAR FOREACH KA USE KARKE DATA KA (empty array) KO NOTE ME PUSH KAR DIYA AUR PUSH KARKE NOTE KE VALUE KO DATA ME STORE KAR DIYA.}

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);

  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
    console.log(data);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    // SAVE IN LOCAL STORAGE

    localStorage.setItem("notes", JSON.stringify(data));
  }
};

addBtn.addEventListener("click", function () {
  addNote();
});

// EK NOTE NAME SE DIV CREATE KIYA AUR AUR NOTE (DIV) ME CLASS ADD KIYA JISKA NAME NOTE HAI AUR US NOTE KA INNERHTML KA EQUAL ME STRUCTURE ADD KAR DIYA (jis me notes ka structure tyar kiya gya tha).

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    
            <div class="tool">
                <i class="save fa-solid fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>

            <textarea>${text}</textarea>
    `;

  // NOTE KO REMOVE KARNE KE LIYE

  note.querySelector(".trash").addEventListener("click", function trash() {
    note.remove();
    saveNotes();
  });

  // NOTES KO SAVE KARNE KE LIYE

  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });
  main.appendChild(note);

  // SAVE NOTE FUNCTION KO CALL KIYA KYOKI USER JITNA NOTE ADD KARE USKO UTNA NOTES VISIBLE HO BUT REFRESH KARNE KE BAD YAHA SE REMOVE HO JATA HAI ISILIYE REMOVE FUNCTION KE BAD BHI SAVENOTES KO CALL KAR DEGE.

  saveNotes();
};

// USER JITNA NOTES FIRST TIME ME CREATE KARTA HAI AUR CREATE KARNE KE BAD REFRESH KARNE PAR UTNA NOTES VISIABLE RAHE

(function () {
  const lsnote = JSON.parse(localStorage.getItem("notes"));

  if (lsnote === null) {
    addNote();
  } else {
    lsnote.forEach((isnote) => {
      // YAHA PAR ADDNOTE(LSNOTE) ISLIYE USE KIYE HAI QKI JAB KOI BHI TEXT LOCALSTORAGE SE HOKAR AaYEGA TO TEXTAREA PAR LIKHA CONTENT SAVE RAHEGA BUT JAB LOCAL STROAGE SE NHI AaYEGA TO TEXT AREA EMPTY RHEGA.

      addNote(lsnote);
    });
  }

  // OPEN KARNE PAR EK TEXTAREAM HAMESA VISIBLE RAHE:-

  if (lsnote.length === 0) {
    localStorage.removeItem("notes");
  } else {
    addNote();
  }
})();
