function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function splittingText(){
    var allh1 = document.querySelectorAll(".page2 h1")

    allh1.forEach(function(elem){
    var clutter = ""
    var h1Text = elem.textContent
    var splitedtext = h1Text.split("")
    splitedtext.forEach(function(e){
        clutter += `<span>${e}</span>`
    })
    elem.innerHTML=clutter
})
}

function gsapAnimation(){
    gsap.to(".page2 h1 span",{
        color:"#F7F7EE",
        stagger:0.2,
        scrollTrigger:{
            trigger:".page2 h1",
            scroller: "#main",
            markers:true,
            start:"top 50%",
            end:"top -10%",
            scrub:2
        }
    })
}
var t1 = gsap.timeline()

function gsapimg(){
    t1.from(".page1 img",{
        scale:0,
        duration:1.6,
        opacity:0
    })
}

function gsapnav(){
    t1.from(".page1 button",{
        y:10,
        duration:0.6,
        opacity:0
    })
}
function gsapnav2(){
    gsap.from(".page1 i",{
        y:10,
        duration:0.6,
        delay:2.4,
        opacity:0
    })
}

function gsaphead(){
    t1.from(".page1 h1",{
        y:"-10%",
        opacity:0,
        duration:0.8
    })
}
function gsaphead2(){
    gsap.from(".page1 h3",{
        y:"-19%",
        opacity:0,
        duration:0.8
    })
}




locomotive()
splittingText()
gsapAnimation()
gsaphead()
gsapimg()
gsapnav()
gsapnav2()
gsaphead2()







