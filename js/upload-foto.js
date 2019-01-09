'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileChooser = document.querySelector(
      '.ad-form__field input[type=file]'
  );
  var houseFileChooser = document.querySelector(
      '.ad-form__upload input[type=file]'
  );
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropZone = document.querySelector(
      '.ad-form__field .ad-form-header__drop-zone'
  );
  var housePhotosDropZone = document.querySelector(
      '.ad-form__upload .ad-form__drop-zone'
  );

  var loadAvatarImg = function (file, fileName) {
    var matches = FILE_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var uploadAvatarWithClick = function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    loadAvatarImg(file, fileName);
  };

  var uploadAvatarWithDrop = function (e) {
    var dt = e.dataTransfer;
    var file = dt.files[0];
    var fileName = file.name.toLowerCase();

    loadAvatarImg(file, fileName);
  };

  var findMatches = function (element) {
    return FILE_TYPES.some(function (fileType) {
      return element.endsWith(fileType);
    });
  };

  var createHousePhotoNode = function (imgSrc) {
    var photosContainer = document.querySelector('.ad-form__photo-container');
    var photoContainer = document.createElement('div');
    var housePreview = document.createElement('img');
    photoContainer.classList.add('ad-form__photo');
    housePreview.width = 70;
    housePreview.height = 70;
    housePreview.src = imgSrc;
    photosContainer.appendChild(photoContainer);
    photoContainer.appendChild(housePreview);
  };

  var createHousePreview = function (file) {
    var photosContainer = document.querySelector('.ad-form__photo-container');
    var renderedPhotos = document.querySelectorAll('.ad-form__photo');
    if (renderedPhotos) {
      for (var i = 0; i < renderedPhotos.length; i++) {
        photosContainer.removeChild(renderedPhotos[i]);
      }
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      createHousePhotoNode(reader.result);
    });

    reader.readAsDataURL(file);
  };

  var loadHouseImgs = function (files) {
    var imgFiles = [].filter.call(files, function (el) {
      return findMatches(el.name);
    });

    if (imgFiles) {
      imgFiles.forEach(function (el) {
        createHousePreview(el);
      });
    }
  };

  var uploadHouseImgsWithClick = function () {
    var files = houseFileChooser.files;

    loadHouseImgs(files);
  };

  var uploadHouseImgsWithDrop = function (e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    loadHouseImgs(files);
  };

  var preventDefaults = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  var highlight = function (e) {
    e.target.classList.add('highlight');
  };

  var unhighlight = function (e) {
    e.target.classList.remove('highlight');
  };

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, preventDefaults, false);
    housePhotosDropZone.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, highlight, false);
    housePhotosDropZone.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, unhighlight, false);
    housePhotosDropZone.addEventListener(eventName, unhighlight, false);
  });

  avatarFileChooser.addEventListener('change', uploadAvatarWithClick);
  houseFileChooser.addEventListener('change', uploadHouseImgsWithClick);
  avatarDropZone.addEventListener('drop', uploadAvatarWithDrop, false);
  housePhotosDropZone.addEventListener('drop', uploadHouseImgsWithDrop, false);
})();
