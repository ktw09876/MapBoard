window.initMap = function() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5400456, lng: 126.9921017 },
    zoom: 10
  });

  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const saveButton = document.getElementById("save-button");

  const markers = new Map();

  function showInputForm(position) {
    const mapDiv = document.getElementById("map");

    //지도 위치 계산
    const mapRect = mapDiv.getBoundingClientRect();

    //입력폼 위치 수정
    const formLeft = position.x - mapRect.left + window.scrollX;
    const formTop = position.y - mapRect.top + window.scrollY;

    messageForm.style.display = "block";
    messageForm.style.left = formLeft + "px";
    messageForm.style.top = formTop + "px";
    messageInput.value = ""; //입력폼 초기화
  }

  //입력폼 숨기기
  function hideInputForm() {
    messageForm.style.display = "none";
  }

  //지도에 마커 추가
  function addMarker(position) {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      label: "M"
    });
    markers.set(position, marker); //마커 저장
  }

  // 메세지와 함께 마커 저장
  function addMessageMarker(position, message) {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      label: "M"
    });
    markers.set(position, marker); //메세지와 함께 마커 저장

    //마커를 클릭하면 메세지(정보창) 보이기
    const infoWindow = new google.maps.InfoWindow({
      content: message
    });

    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  }

  //지도를 클릭했을 때 이벤트
    map.addListener("click", function(event) { //지도를 클릭했을 때
      const clickedPosition = event.latLng; //위치 정보 저장
      const markerExists = markers.has(clickedPosition); //현재 클릭한 위치에 마커가 있는지 확인

      if (!markerExists) { //마커가 없으면
        addMarker(clickedPosition);//마커 생성
        showInputForm({ x: event.clientX, y: event.clientY }); //메세지 입력 창 생성

        //save 버튼 클릭
        saveButton.addEventListener("click", function() {
        const message = messageInput.value.trim();

          if (message !== "") {
            addMessageMarker(clickedPosition, message); //메시지와 함께 마커 추가
          } else {
            alert("내용을 입력하세요")
          }
          hideInputForm();
        });
      }

    });


};
