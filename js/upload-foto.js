'use strict';

(function () {
  var util = window.util;
  var constants = window.constants;
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

  var loadAvatarImg = function (e) {
    var file = e.dataTransfer
      ? e.dataTransfer.files[0]
      : avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();
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

  var findMatches = function (element) {
    return FILE_TYPES.some(function (fileType) {
      return element.endsWith(fileType);
    });
  };

  var createHousePhotoNode = function (imgSrc) {
    var photosContainer = document.querySelector('.ad-form__photo-container');
    var previewContainer = document.createElement('div');
    var housePreview = document.createElement('img');
    previewContainer.classList.add('ad-form__photo');
    housePreview.width = constants.HOUSE_PREVIEW.WIDTH;
    housePreview.height = constants.HOUSE_PREVIEW.HEIGHT;
    housePreview.src = imgSrc;
    photosContainer.appendChild(previewContainer);
    previewContainer.appendChild(housePreview);
  };

  var createHousePreview = function (file) {
    util.deleteHousePreviews();
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      createHousePhotoNode(reader.result);
    });

    reader.readAsDataURL(file);
  };

  var loadHouseImgs = function (e) {
    var files = e.dataTransfer ? e.dataTransfer.files : houseFileChooser.files;
    var imgFiles = [].filter.call(files, function (el) {
      return findMatches(el.name);
    });

    if (imgFiles) {
      imgFiles.forEach(function (el) {
        createHousePreview(el);
      });
    }
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

  avatarFileChooser.addEventListener('change', loadAvatarImg);
  houseFileChooser.addEventListener('change', loadHouseImgs);
  avatarDropZone.addEventListener('drop', loadAvatarImg, false);
  housePhotosDropZone.addEventListener('drop', loadHouseImgs, false);
})();
