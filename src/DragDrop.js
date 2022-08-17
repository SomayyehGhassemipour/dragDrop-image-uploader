document.querySelectorAll('.drop-area__input').forEach((inputElement) => {
	const dropAreaElement = inputElement.closest('.drop-area');

	dropAreaElement.addEventListener("click", e => {
		inputElement.click();
	});

	inputElement.addEventListener("change", e=> {
		if(inputElement.files.length){
			updateThumbnail(dropAreaElement, inputElement.files[0]);
		}
	})
	dropAreaElement
		.addEventListener("dragover", (e) => {
			e.preventDefault();
			dropAreaElement.classList.add("drop-area--over");
		});

	dropAreaElement
		.addEventListener("dragleave", (e) => {
			dropAreaElement.classList.remove("drop-area--over");
		});
	dropAreaElement
		.addEventListener("dragend", (e) => {
			dropAreaElement.classList.remove("drop-area--over");
		});
	
		dropAreaElement
		.addEventListener("drop", (e) => {

			e.preventDefault();

			if(e.dataTransfer.files.length){
				inputElement.files = e.dataTransfer.files;
				updateThumbnail(dropAreaElement, e.dataTransfer.files[0]);
			}

			dropAreaElement.classList.remove(".drop-area--over");
		});	
})

/**
	* update the thumbnail in drop area element
	@param {HTMLElement} dropAreaElement
	@param {File} file
**/

function updateThumbnail(dropAreaElement, file) {
	
	
	if(dropAreaElement.querySelector(".drop-area__prompt")){
		dropAreaElement.querySelector(".drop-area__prompt").remove();
	}
	

	let thumbnailElement = dropAreaElement.querySelector(".drop-area__thumb");

	if(!thumbnailElement){
		thumbnailElement = document.createElement("div");
		thumbnailElement.classList.add("drop-area__thumb");
		dropAreaElement.appendChild(thumbnailElement);
	}

	thumbnailElement.dataset.label = file.name;
	// show thumbnail for image file
	if(file.type.startsWith("image/")){
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => {
			thumbnailElement.style.backgroundImage = `url('${ reader.result }')`;
		}
	}else {
		thumbnailElement.style.backgroundImage = null;
	}
}
