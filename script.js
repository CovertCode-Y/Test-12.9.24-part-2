let Perssonel = JSON.parse(localStorage.getItem("Perssonel")) || [];

const addPerssonelLocalStorage = () => {
  const input_name = document.querySelector("#input_name");
  const input_rank = document.querySelector("#input_rank");
  const input_position = document.querySelector("#input_position");
  const input_platoon = document.querySelector("#input_platoon");
  const input_mission_time = document.querySelector("#input_mission_time");
  const status = document.querySelector("#status");
  if (
    !input_name.value &&
    !input_rank.value &&
    !input_position.value &&
    !input_platoon.value &&
    !input_mission_time.value &&
    !status.value
  ) {
    alert("נא למלאות את כל השדות");
    return;
  }

  const Persson = {
    name: input_name.value,
    rank: input_rank.value,
    position: input_position.value,
    platoon: input_platoon.value,
    mission_time: input_mission_time.value,
    status: status.value,
  };

  Perssonel.push(Persson);
  localStorage.setItem("Perssonel", JSON.stringify(Perssonel));
  input_name.value = "";
  input_rank.value = "";
  input_position.value = "";
  input_platoon.value = "";
  input_mission_time.value = "";
  status.value = "";
};

const btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", addPerssonelLocalStorage);

const RenderTable = (ListPerssonel = Perssonel) => {
  const table_body = document.querySelector("#table_body");
  table_body.textContent = "";
  ListPerssonel.forEach((Persson, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("fade-in");
    const name = document.createElement("td");
    name.textContent = Persson.name;
    const rank = document.createElement("td");
    rank.textContent = Persson.rank;
    const position = document.createElement("td");
    position.textContent = Persson.position;
    const platoon = document.createElement("td");
    platoon.textContent = Persson.platoon;
    const mission_time = document.createElement("td");
    mission_time.textContent = Persson.mission_time;
    const status = document.createElement("td");
    status.textContent = Persson.status;
    const actionsCell = document.createElement("td");
    actionsCell.id = "tdBtns";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.id = "btnDelete";
    removeBtn.className = "btnGreen";
    removeBtn.onclick = () => removePerssonel(index);
    const missionBtn = document.createElement("button");
    missionBtn.textContent = "Mission";
    missionBtn.id = "btnMission";
    missionBtn.className = "btnGreen";
    // missionBtn.className = 'displayNone';
    missionBtn.onclick = () => missionPerssonel(index);
    const editBtn = document.createElement("button");
    editBtn.id = "btnEdit";
    editBtn.className = "btnGreen";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editPersson(index);
    actionsCell.appendChild(removeBtn);
    actionsCell.appendChild(missionBtn);
    actionsCell.appendChild(editBtn);

    tr.appendChild(name);
    tr.appendChild(rank);
    tr.appendChild(position);
    tr.appendChild(platoon);
    tr.appendChild(mission_time);
    tr.appendChild(status);
    tr.appendChild(actionsCell);
    table_body.appendChild(tr);
  });
};
RenderTable();

const removePerssonel = (index) => {
  Perssonel.splice(index, 1);
  localStorage.setItem("Perssonel", JSON.stringify(Perssonel));
  RenderTable();
};

const missionPerssonel = (index) => {
  let time = Perssonel[index].mission_time;
  setInterval(() => {
    const btnMission = document.querySelector("#btnMission");
    btnMission.textContent = `Mission Time: ${time}`;
    time--;
    if (time < 0) {
      clearInterval();
      btnMission.textContent = "Mission Completed";
    }
  }, 1000);
};

const editPersson = (index) => {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const edit_form = document.querySelector("#edit_form");
  edit_form.style.display = "block";
  header.style.display = "none";
  main.style.display = "none";
  const Persson = Perssonel[index];
  const edit_name = document.querySelector("#edit_name");
  const edit_rank = document.querySelector("#edit_rank");
  const edit_position = document.querySelector("#edit_position");
  const edit_platoon = document.querySelector("#edit_platoon");
  const edit_mission_time = document.querySelector("#edit_mission_time");
  const edit_status = document.querySelector("#edit_status");
  edit_name.value = Persson.name;
  edit_rank.value = Persson.rank;
  edit_position.value = Persson.position;
  edit_platoon.value = Persson.platoon;
  edit_mission_time.value = Persson.mission_time;
  edit_status.value = Persson.status;

  const btnSaveEdit = document.querySelector("#btnSaveEdit");
  const btnCancel = document.querySelector("#btnCancel");
  btnSaveEdit.onclick = () => {
    Persson.name = edit_name.value;
    Persson.rank = edit_rank.value;
    Persson.position = edit_position.value;
    Persson.platoon = edit_platoon.value;
    Persson.mission_time = edit_mission_time.value;
    Persson.status = edit_status.value;
    localStorage.setItem("Perssonel", JSON.stringify(Perssonel));
    RenderTable();
    edit_form.style.display = "none";
    header.style.display = "block";
    main.style.display = "block";
  };
  btnCancel.onclick = () => {
    edit_form.style.display = "none";
    header.style.display = "block";
    main.style.display = "block";
  };
};

const btnSortName = document.querySelector("#btnSortName");
btnSortName.addEventListener("click", () => {
  Perssonel.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem("Perssonel", JSON.stringify(Perssonel));
  RenderTable();
});

// const retired = (Persson) => {
//     if (Persson.status === 'Retired') {
//         const btnMission = document.querySelector('#btnMission');
//         btnMission.classList.add('displayNone');
//     }
// }
