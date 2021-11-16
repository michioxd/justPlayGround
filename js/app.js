$(document).ready(function() {
    var DarkMode = localStorage.getItem('DarkMode');
    var UserLastCode = localStorage.getItem('UserLastCode');
    require.config({ paths: { 'vs': '/modules/monaco-editor/min/vs' } });
    window.MonacoEnvironment = { getWorkerUrl: () => proxy };
    let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: '/modules/monaco-editor/min/'
	};
	importScripts('/modules/monaco-editor/min/vs/base/worker/workerMain.js');`], { type: 'text/javascript' }));
    $('body').addClass("mdui-appbar-with-toolbar mdui-theme-primary-cyan mdui-theme-accent-cyan");
    $('#app').html(`
    <header class="mdui-appbar mdui-appbar-fixed">
        <div class="mdui-toolbar mdui-color-theme">
            <span class="mdui-typo-title">justPlayGround!</span>
            <div class="mdui-toolbar-spacer"></div>
            <a class="mdui-btn mdui-btn-icon BuildApp" mdui-tooltip="{content: 'Build Code'}"><i class="mdui-icon material-icons">construction</i></a>
            <a class="mdui-btn mdui-btn-icon SaveToLocal" mdui-tooltip="{content: 'Lưu code hiện tại vào browser'}"><i class="mdui-icon material-icons">save</i></a>
            <a class="mdui-btn mdui-btn-icon ClearLocal" style="display: none" mdui-tooltip="{content: 'Xóa code đã lưu'}"><i class="mdui-icon material-icons">clear</i></a>
            <a class="mdui-btn mdui-btn-icon ExportToFile" mdui-tooltip="{content: 'Xuất ra file'}"><i class="mdui-icon material-icons">system_update_alt</i></a>
            <a class="mdui-btn mdui-btn-icon AboutToggle" mdui-tooltip="{content: 'Thông tin về sản phẩm :)'}"><i class="mdui-icon material-icons">info</i></a>
            <a class="mdui-btn mdui-btn-icon" onclick="toggleDark()" mdui-tooltip="{content: 'Đen thui/Ánh sáng của đảng mode'}"><i class="mdui-icon material-icons">dark_mode</i></a>
            <a class="mdui-btn mdui-btn-icon" href="https://github.com/michioxd/justPlayGround">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" class="mdui-icon" style="width: 24px;height:24px;">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5
                c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1
                c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4
                c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7
                c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5
                c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"></path>
            </svg>
            </a>
        </div>
    </header>
    <div class="mdui-container">
        <div class="App">
            <div class=" App_editor " id="EA_EDITOR">
            </div>
            <div class="App_preview">
                <iframe src="" id="Preview" frameborder="0"></iframe>
            </div>
        </div>
    </div>
    `);
    if (UserLastCode !== null) {
        $('.ClearLocal').show();
    }

    function encodeString(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    function decodeString(str) {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    if (localStorage.getItem('FirstTime') == null) {
        mdui.alert('Konnichiwaaa~<br>Đây là đống hotkey sẽ giúp bạn nhiều đấy<br> - Build code: Ctrl+B<br> - Lưu: Ctrl+S<br> - Xuất ra file: Ctrl+Shift+E<br> - Xóa code đã lưu: Ctrl+Shift+R<br><br>arigatouuu>~<', 'Helu!');
        localStorage.setItem('FirstTime', 'true');
    }

    require(["vs/editor/editor.main"], function() {
        var GetStorage, UserLastCode = localStorage.getItem('UserLastCode');
        if (UserLastCode == null) {
            GetStorage = `<!-- chào mừng bẹn tứi justPlayGround! nyehehe -->
<!DOCTYPE html>
<html>
    <head>
        <style>
             * {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            h1 {
                text-align:center;
                margin-top:3rem
            }
        </style>
    </head>
    <body>
        <h1>konbanwaaaa~<h1>
        <img src="https://c.tenor.com/72bg_oC6PvAAAAAM/eromanga-sensei-izumi-sagiri.gif">
    </body>
</html>
<!-- nhấn ctrl+b để chạy code nhé -->`;
        } else {
            GetStorage = decodeString(UserLastCode);
        }
        var AppEditor = monaco.editor.create(document.getElementById('EA_EDITOR'), {
            value: [GetStorage].join('\n'),
            language: 'html',
            theme: 'vs-light'
        });
        if (DarkMode == "true") {
            monaco.editor.setTheme('vs-dark');
        }
        $('.BuildApp').click(function() {
            var Value = AppEditor.getValue().replace(/\s{2,}/g, '')
                .replace(/%/g, '%25')
                .replace(/&/g, '%26')
                .replace(/#/g, '%23')
                .replace(/"/g, '%22')
                .replace(/'/g, '%27');
            $('#Preview').attr('src', 'data:text/html;charset=UTF-8,' + Value);
        });
        $('.ExportToFile').click(function() {
            var today = new Date();
            var FileName = "justPlayGround" + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds() + ".html";
            var Value = AppEditor.getValue(),
                blob = new Blob([Value], { type: "text/plain;charset=utf-8" }),
                url = URL.createObjectURL(blob),
                saveFileBTN = document.createElement("a");
            saveFileBTN.href = url;
            saveFileBTN.download = FileName;
            saveFileBTN.click();
            saveFileBTN.remove();
            window.URL.revokeObjectURL(url);
        });
        $('.SaveToLocal').click(function() {
            var Value = encodeString(AppEditor.getValue());
            localStorage.setItem('UserLastCode', Value);
            mdui.snackbar({
                message: 'Đã lưu!'
            });
            $('.ClearLocal').show();
        });
        $('.ClearLocal').click(function() {
            mdui.confirm('Đống code mà bạn đã lưu vào browser sẽ bị bay màu! Tui hem chịu đâu nhaa', 'Chắc chưa?', function() {
                localStorage.removeItem('UserLastCode');
                mdui.snackbar({
                    message: 'Đã xóa!'
                });
                $('.ClearLocal').hide();
            });

        });
    });
    if (DarkMode == "true") {
        $('body').addClass("mdui-theme-layout-dark");

    }
    $(document).keydown(function(event) {
        if (event.ctrlKey && event.keyCode == 83) {
            $('.SaveToLocal').click();
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 69) {
            $('.ExportToFile').click();
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 82) {
            if (UserLastCode !== null) {
                $('.ClearLocal').click();
                return false;
            }
        } else if (event.ctrlKey && event.keyCode == 66) {
            $('.BuildApp').click();
            return false;
        }
    });
    $('.AboutToggle').click(function() {
        mdui.alert(`<b>justPlayGround ver 0.1</b>
        <br> by <b>michio kawaii :3</b> nyaaaaaaaaaaa~
        <br> Giấy phép: MIT License
        <br>
        Trang web này có sử dụng các thư viện bên dưới:<br>
        Monaco Editor, MDUI, jQuery, and others.
        <br> <a target="_blank" href="https://github.com/michioxd/justPlayGround">Github</a>
        `, "justPlayGround!");
    });
    mdui.mutation();
});

function toggleDark() {
    var DarkMode = localStorage.getItem('DarkMode');
    if (DarkMode == "true") {
        localStorage.setItem('DarkMode', "false");
        $('body').removeClass("mdui-theme-layout-dark");
        monaco.editor.setTheme('vs-light');
    } else if (DarkMode == "false") {
        localStorage.setItem('DarkMode', "true");
        $('body').addClass("mdui-theme-layout-dark");
        monaco.editor.setTheme('vs-dark');
    }
}