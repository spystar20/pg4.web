let musicList = [
    {
      music: "Yeh-Raaten-Yeh-Mausam-Kishore-Kumar-Asha-Bhosle.mp3",
      cover: "s3.jpg",
      title: "yeh raatein yeh mausam ",
      artist: "kishore kumar & asha bhosle",
    },
    {
      music: "Ye-Chamak-Ye-Damak-Phoolon-Mein-Mahak(PagalNew.Com.Se).mp3",
      cover: "s6.jpg",
      title: "ye chamak ye damak",
      artist: "sudhir vyas",
    },
    {
      music:
        "128-Main Zindagi Ka Saath Nibhata Chala Gaya - Hum Dono (1962) 128 Kbps.mp3",
      cover: "s5.jpg",
      title: "main zindagi ka saath",
      artist: "md. rafi",
    },
    {
      music: "128-Kisi Ki Muskurahaton Se - Anari 1975 128 Kbps.mp3",
      cover: "s1.jpg",
      title: "kisi ki muskarahton pe",
      artist: "mukesh",
    },
    {
      music: "128-Bekarar Karke Hume - Bees Saal Baad (1962) 128 Kbps.mp3",
      cover: "s2.jpg",
      title: "bekarar karke",
      artist: "hemant kumar",
    },
    {
      music: "128-Bawara Mann - JOLLY LLB 2 128 Kbps.mp3",
      cover: "s4.jpg",
      title: "bawra man",
      artist: "jubin nautiyal",
    },
  ];
  
  let rotatecd = document.querySelector(".cd");
  let rotatecdbg = document.querySelector(".coverbg");
  let playbtn = document.querySelector(".play");
  let range = document.querySelector(".audio-music");
  let audio = document.querySelector(".audio");
  let pausebtn = document.querySelector(".pause");
  let rotate = document.querySelector(".cover");
  let index = 0;

  document.querySelector(".music-menu").addEventListener("click",()=>{
    document.querySelector(".list").classList.toggle("show")
  })
  window.addEventListener("load", () => {
    loadmusic(index);
  });
  function loadmusic(index) {
    audio.src = musicList[index].music;
    rotate.src = musicList[index].cover;
    rotatecdbg.src = musicList[index].cover;
    document.querySelector(".artist").innerHTML = musicList[index].artist;
    document.querySelector(".title").innerHTML = musicList[index].title;
  }
  
  audio.onloadedmetadata = function () {
    range.max = audio.duration;
    range.value = audio.currentTime;
  };
  
  audio.ontimeupdate = function () {
    range.value = audio.currentTime;
  };
  range.oninput = function () {
    audio.currentTime = range.value;
    if (audio.paused) {
      rotatecdbg.classList.toggle("playanimation");
      rotatecd.classList.toggle("playanimation");
      playbtn.style.visibility = "hidden";
      pausebtn.style.visibility = "visible";
      audio.play();
    }
  };
  document.querySelector(".back").addEventListener("click", () => {
    index = (index - 1 + musicList.length) % musicList.length;
    audio.src = musicList[index].music;
    rotate.src = musicList[index].cover;
    rotatecdbg.src = musicList[index].cover;
    document.querySelector(".artist").innerHTML = musicList[index].artist;
    document.querySelector(".title").innerHTML = musicList[index].title;
    loadmusic(index);
    playpause();
  });
  
  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % musicList.length;
    audio.src = musicList[index].music;
    rotate.src = musicList[index].cover;
    rotatecdbg.src = musicList[index].cover;
    document.querySelector(".artist").innerHTML = musicList[index].artist;
    document.querySelector(".title").innerHTML = musicList[index].title;
    playpause();
  });
  document.querySelector(".shuffle").addEventListener("click", () => {
    let randindex = Math.floor(Math.random() * musicList.length);
  
    index = randindex;
    loadmusic(index);
    playpause();
  });
  
  function playpause() {
    if (audio.paused) {
      rotatecdbg.classList.toggle("playanimation");
      rotatecd.classList.toggle("playanimation");
      playbtn.style.visibility = "hidden";
      pausebtn.style.visibility = "visible";
      audio.play();
    } else {
      audio.pause();
      pausebtn.style.visibility = "hidden";
      playbtn.style.visibility = "visible";
    }
  }
  
  const ulTag = document.querySelector(".list");
  for (let i = 0; i < musicList.length; i++) {
    let li = `<li li-index=${[i]}><div>${musicList[i].title}</div><p>${
      musicList[i].artist
    }</p></li>`;
    ulTag.insertAdjacentHTML("beforeend", li);
  }
  const AllliTags = ulTag.querySelectorAll("li");
  for (let j = 0; j < musicList.length; j++) {
    if (AllliTags[j].getAttribute("li-index") == index) {
      AllliTags[j].classList.add("playing");
    }
    AllliTags[j].setAttribute("onclick", "clicked(this)");
  }
  function clicked(element) {
    let getli = element.getAttribute("li-index");
    index = getli;
    audio.play();
    loadmusic(index);
  }