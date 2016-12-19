/* 
    Credit to Paul Irish's example on requestAnimationFrame
    https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    
    Credit to www.javascriptkit.com's example on requestAnimationFrame
    http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
*/
if (!window.requestAnimationFrame)
{
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element)
        {
            window.setTimeout(callback, 1000 / 60);
        }
}
