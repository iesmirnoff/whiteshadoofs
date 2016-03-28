//3

function BaseMenu(own_block_id) {
    this.own_block_id    = own_block_id;
    this.own_block       = $(this.own_block_id);
    this.parent_block_id = '#aside';
    this.parent_block    = $(this.parent_block_id);
    this.view_url        = '';
    this.js_url          = '';
    this.isOpened        = false;

    this.show_position   = 0;
    this.show_duration   = 'default';
    this.hide_position   = 1000;
    this.hide_duration   = 'default';
    this.preview_style   = {
        'display': 'none'
    };

    this.hide = function () {
        this.isOpened = false;
        this.own_block.animate({
            left: this.hide_position
        }, {
            duration: this.hide_duration,
            complete: function () {
                this.own_block.css(this.preview_style);
            }.bind(this)
        });
    };

    this.show = function () {

        if (this.own_block.text() === '') {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.view_url);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                if (xhr.status == 200) {
                    $(this.own_block).html(xhr.responseText);
                }
            }.bind(this);
        }
        setTimeout(function () {
            this.isOpened = true;
            this.own_block.css('display', 'block');
            this.own_block.animate({
                left: this.show_position
            }, {
                duration: this.show_duration
            });
        }.bind(this), 0);
    };

    this.toggle = function () {
        console.log(this.show_duration);
        this.isOpened ? this.hide() : this.show();
    };

    this.isOpen = function () {
        return this.isOpened;
    }
}

function MenuCategory(own_block_id) {

    BaseMenu.apply(this, arguments);
    var self = this;
    var posInLeft = -175;
    var posInRight = 200;
    self.own_block_id = own_block_id;
    self.view_url = 'get_fe_menu?name=category_list';
    self.js_url   = '';
    self.show_position = 25;
    self.preview_style = {
        'display': 'none',
        'left': posInLeft
    };

    var parent_hide = self.hide;
    self.hide = function (into) {
        self.hide_position = into == 'left' ? posInLeft : posInRight;
        parent_hide.apply(self, arguments);
    };
}

function MenuActions(own_block) {
    //BaseMenu.apply(this, arguments);
    var self = this;
    self.show_duration = 'slow';

    //plugs
    this.hide = function () {};
    this.show = function () {};
    this.toggle = function () {};
}

function MenuAbout() {
    //BaseMenu.apply(this, arguments);
    var self = this;
    self.show_duration = 'slow';

    //plugs
    this.hide = function () {};
    this.show = function () {};
    this.toggle = function () {};
}

function MenuSearch(search, searchResultElem) {
    /*
     Меню 'Поиск'. Аргументы:
     search - блок с формой поиска,
     searchResultElem - блок с результатами поиска.

     openedItem - отображаемый в данный момент блок.

     */
    BaseMenu.apply(this, arguments);
    var self = this;
    var posInRight = 200;
    self.own_block = search;
    self.view_url = 'get_fe_menu?name=search_filter';
    self.preview_style = {
        'display': 'none',
        'left': -posInRight
    };

    self.toggle = function () {
        if (self.isOpen()) {
            self.own_block === searchResultElem ? self.hide(null, searchResultElem) : self.hide();
        } else {
            self.show();
        }
    };
    var parent_hide = self.hide;
    self.hide = function (into) {
        self.hide_position = into == 'left' ? -posInRight : posInRight;
        self.own_block = self.own_block == searchResultElem ? searchResultElem : search;
        parent_hide.apply(self);
    };

    var parent_show = self.show;
    self.show = function (item) {
        self.own_block = item == 'searchResultElem' ? searchResultElem : search;
        parent_show.apply(self, arguments);
    };

    function jxRequestSearchResult(url, elem) {
        if (url === 'undefined' || elem === 'undefined')
            throw new Error('2 arguments expected.');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status == 200)
                $('#sr_block', elem).html(this.responseText);
            else
                $('body').html(this.responseText);
        }
    }

    $('input[name=to_search]', search).on('click', function (event) {
        /*
         При клике прячется форма поиска и отображается блок с результатами
         поиска, далее обход формы и формирование строки GET-запроса.
         */
        event.preventDefault();
        self.hide();
        self.show('searchResultElem');

        var form = document.forms.search_form;
        var url = 'objects_search?';

        for (var i = 0; i < form.elements.length; i++) {
            var item = form.elements[i];
            if (i != 0 && item.type != 'submit') url += '&';

            if (item.type == 'checkbox' || item.type == 'text') {
                url += (item.name + '=');
                if (item.type == 'checkbox')
                    url += item.checked;
                else if (item.type == 'text')
                    url += encodeURIComponent(item.value);
            }
        }
        jxRequestSearchResult(url, $('#search_result'));
    });

    $('input[name=new_search]', searchResultElem).on('click', function (event) {
        event.preventDefault();
        self.hide('right', searchResultElem);
        self.show();
    });
}

function MenuProfile() {
    this.hide = function () {};
    this.show = function () {};
    this.toggle = function () {};
}

function Menu(elem) {
    var menu = {
        category: new MenuCategory('#category_list'),
        actions: new MenuActions($('#actionsWindow_1')),
        about: new MenuAbout($('#about_window')),
        search: new MenuSearch($('#search_filter'), $('#search_result')),
        profile: new MenuProfile(),
    };
    var lastOpened = null;
    var curOpened = null;

    function hideAll() {
        if (lastOpened) menu[lastOpened].hide();
    }

    elem.on('click', function (event) {
        console.log(event.target.id);
        if (event.target.id != 'profile') {
            event.preventDefault();
        }
        curOpened = event.target.id;
        if (curOpened != lastOpened) {
            switch (lastOpened) {
                case 'category':
                    if (curOpened != 'search') menu.category.hide('left');
                    else menu.category.hide();
                    break;
                case 'actions':
                    menu.actions.hide();
                    break;
                case 'search':
                    if (curOpened != 'category') menu.search.hide('left');
                    else menu.search.hide();
                    break;
                case 'about':
                    menu.about.hide();
                    break;
            }
            lastOpened = event.target.id;
        }
        menu[curOpened].toggle();
    });

    this.hideAll = hideAll;
}