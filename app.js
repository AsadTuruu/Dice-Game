//Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэв.
var activePlayer = 0;
// Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувсагч
var roundScore = 0;

// Шооны алт талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1- 6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.

// Програм эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("current-1").textContent = 0;
//Шоог дэлгэцнээс алга болгох
var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Шооны зургийг дэлгэцэнд гаргана.
  diceDom.style.display = "block";
  // Буусан санамсаргүй тоонд харгалзах шооны зургийг дэлгэцэнд гаргана.
  diceDom.src = "dice-" + diceNumber + ".png";
  // Буусан тоо нь 1-с ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    // 1-с ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    switchToNextPlayer();
  }
});
//Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  //Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
  scores[activePlayer] = scores[activePlayer] + roundScore;

  // Дэлгэц дээрх оноог өөрчилнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  // Уг тоглогч хожсон эсэхийг шалгах
  if (scores[activePlayer] >= 10) {
    // Ялагч гэсэн техтийг нэрнийх нь оронд гаргана
    document.getElementById("name-" + activePlayer).textContent = "WINNER";
    document
      .querySelector("player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчийн ээлжийг солино
    switchToNextPlayer();
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг
function switchToNextPlayer() {
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  // Хэрэв идэвхтэй  тоглогч нь  0 байвал идэвхтэй тоглогчийг 1 болго.
  // Үгүй бол идэвхтэй тоглогчийг 0 болго.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //Шоог түр алга болгоно
  diceDom.style.display = "none";
}
