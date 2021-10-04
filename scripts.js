window.onload=function()
{
    // Global Constants
    const btn_new = document.getElementById("new");
    const btn_save = document.getElementById("save");
    const btn_run = document.getElementById("run");
    const form = document.getElementById("code");
    const output = document.getElementById("output");
    const maxLines = 999;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const fidget = urlParams.get('fidget');

    // Create a Unique ID for this Fidget, and set the Save button to point to it
    var outputFile = getUUID();
    btn_save.setAttribute("href", "fidgets/" + outputFile + ".html");

    // If we have provided a Fidget in the URL Parameters, then load it if we can.
    if(fidget != null)
    {
        outputFile = fidget;

        // Make a request to check if the Fidget exists, so we can safely return a warning
        var http = new XMLHttpRequest();
        http.open('GET', "fidgets/" + fidget + ".html", true);
        http.send();
        http.onreadystatechange = function()
        {
            if(http.readyState === 4)
            {
                if(http.status === 200)
                {
                    // Render the result
                    output.src = "fidgets/" + fidget + ".html";

                    // Variables
                    const bodyTagLength = 6;
                    const styleTagLength = 7;
                    const scriptTagLength = 8;

                    // Break the result of the Fidget so we can populate the HTML, CSS, and JS windows accordingly
                    var $html = http.responseText.substring(http.responseText.indexOf("<body>") + bodyTagLength, http.responseText.indexOf("</body>"));
                    var $css = http.responseText.substring(http.responseText.indexOf("<style>") + styleTagLength, http.responseText.indexOf("</style>"));
                    var $js = http.responseText.substring(http.responseText.indexOf("<script>") + scriptTagLength, http.responseText.indexOf("</script>"));
                    
                    // Populate the Code windows
                    document.getElementById("html").innerText = $html;
                    document.getElementById("css").innerText = $css;
                    document.getElementById("js").innerText = $js;

                    // Point the Download button to this Fidget
                    btn_save.setAttribute("href", "fidgets/" + fidget + ".html");
                }
                else
                {
                    // Safely warn the user
                    alert("There was a problem getting this Fidget. It may have been deleted. Please check the URL and try again.");

                    // Replace the URL
                    window.location.replace('/');
                }
            }
        }
    }
    
    // Create a Unique ID
    function getUUID()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Click New
    btn_new.addEventListener("click", function()
    {
        // Replace the URL
        window.location.replace('/');
    });

    // Click Run
    btn_run.addEventListener("click", function()
    {
        // Get contents of Code Windows
        const html = document.getElementById("html").value;
        const css = document.getElementById("css").value;
        const js = document.getElementById("js").value;

        // If any of the Code Windows are empty, replace with NULL
        var $html = html != "" ? html : "NULL";
        var $css = css != "" ? css : "NULL";
        var $js = js != "" ? js : "NULL";

        // Run the Code
        const run = new XMLHttpRequest();
        run.open("POST", "run.php?file="+encodeURIComponent(outputFile)+"&html="+encodeURIComponent($html)+"&css="+encodeURIComponent($css)+"&js="+encodeURIComponent($js));
        run.send();
        run.onload = function()
        {
            // If there was a problem, safely warn the user
            if(this.responseText == "fail")
            {
                alert("There was a problem saving this Fidget. Please try again.");
                return;
            }

            // Render the result and point the Save button to the Fidget
            output.src="fidgets/" + outputFile + ".html";
            btn_save.setAttribute("href", "fidgets/" + outputFile + ".html");
        };
    });

    // Populate the InputLines with 999 lines
    const inputLines = document.querySelectorAll(".code__input__lines");
    var lineCount = "";
    for($i = 1; $i <= maxLines; $i++)
    {
        lineCount += $i + "    ";
    }
    inputLines.forEach((input) =>
    {
        input.innerText = lineCount;
    });

    // Handle Writing Code
    const textareas = document.querySelectorAll(".code__input__textarea");
    textareas.forEach((textarea) =>
    {
        // Scroll the Line Number to match the Code input
        const textLines = document.getElementById(textarea.getAttribute("id") + "-lines");
        textarea.addEventListener("input", function()
        {
            textLines.scrollTop = textarea.scrollTop;
        });
        textarea.addEventListener("scroll", function()
        {
            textLines.scrollTop = textarea.scrollTop;
        });

        textarea.addEventListener("keydown", function(e)
        {
            // Allow the user to use Tab to make spaces instead of typing a bunch of spaces
            if (e.key == 'Tab')
            {
                e.preventDefault();

                // Get the start and end of this section
                var start = this.selectionStart;
                var end = this.selectionEnd;

                // Insert a Tab Space
                this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
            }

            // Limit the number of lines in the code, but allow the user to delete or backspace
            var lineCount = (this.value.match(/\n/g) || []).length + 1;
            if(lineCount > maxLines)
            {
                if (e.key == 'Backspace' || e.key == 'Delete')
                {
                    return true;
                }
                e.preventDefault();
                return false;
            }
        });
    });
}
