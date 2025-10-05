var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

document.addEventListener("DOMContentLoaded", () => {
    // General dropdown controls
    const drpBtnList = [...document.getElementsByClassName("drpBtn")];
    const drpMenuLists = [...document.getElementsByClassName("drpMenu")];
    drpBtnList.map((b, index) => b.setAttribute("drptarget", ("drp" + index)));
    drpMenuLists.map((b, index) => b.setAttribute("drptargetmenu", ("drpTargetMenu" + index)));

    // The below commented out code replicates the width: 70% behaviour of initial Resource dropdown mockup design
    // ONLY comment it out and extract it in places where that behaviour is wanted, DO NOT comment out in main.js
    // window.addEventListener("click", (e) => {
    //   drpBtnList.map((b) => {
    //       if (b != e.target) {
    //           b.classList.remove("w-seventy")
    //       }
    //   })
    // })

    // drpBtnList.map((b) => {
    //   b.addEventListener("click", (e) => {
    //       e.preventDefault();
    //       e.target.classList.toggle("w-seventy")
    //   })
    // })
    drpMenuLists.map((l, drpBtnIndex) => {
        let menuBtnsList = [...l.querySelectorAll(".dropdown-item")];
        menuBtnsList.map((b) => {
            b.setAttribute("drptarget", ("drp" + drpBtnIndex));
            b.addEventListener("click", (e) => {

                menuBtnsList.map(b => b.classList.remove("show"))
                e.target.classList.add("show");
                let btnText = e.target.textContent;
                let btnCheck = e.target.getAttribute("drptarget");
                let drpBtn = drpBtnList.find((b) => b.getAttribute("drptarget") === btnCheck);
                let newText = document.createTextNode(btnText);
                drpBtn.replaceChild(newText, drpBtn.firstChild)
            })
        })
    })

    // Navbar controls
    const shadeLine = document.getElementById("shadeLine");
    const navbarToggler = document.getElementById("navbarToggler");
    const searchToggler = document.getElementById("searchToggler");
    // const searchBarContainer = document.getElementById("searchBarContainer");
    // const navBarContainer = document.getElementById("navbarSupportedContent");
    //const togglers = [navbarToggler, searchToggler];
    //const navContainers = [searchBarContainer, navBarContainer];

    function NavbarCloseAndOpen(e) {
        // Open and close navbar AND searchbar
        let btn = e.target;
        let searchBar = document.getElementById("searchBarContainer");
        let searchBtn = document.getElementById("searchToggler");
        let icon = searchBtn.querySelector("svg");
        if (!btn.classList.contains("collapsed") && btn.getAttribute("aria-expanded") != "false") {
            // Open searchbar
            searchBar.classList.add("show");
            searchBtn.setAttribute("aria-expanded", true);
            searchBtn.classList.remove("collapsed");
            searchBtn.setAttribute("disabled", true);
            // Change search icon
            if (icon.getAttribute("data-icon") === "xmark") {
                icon.setAttribute("data-icon", "magnifying-glass");
            }

        } else {
            searchBar.classList.remove("show");
            searchBtn.setAttribute("aria-expanded", false);
            searchBtn.classList.add("collapsed");
            searchBtn.removeAttribute("disabled");
        }
    }

    //const closeAndOpen = (e, otherIconName) => {
    //    let openToggler = e.target;
    //    let openElementId = openToggler.getAttribute("data-bs-target").substring(1);
    //    let otherToggler = togglers.find((c) => openToggler != c);
    //    let otherContainer = navContainers.find((c) => c.id != openElementId);

    //    if (
    //        !openToggler.classList.contains("collapsed") &&
    //        otherToggler.getAttribute("aria-expanded") != "false"
    //    ) {
    //        otherContainer.classList.remove("show");
    //        otherToggler.setAttribute("aria-expanded", false);
    //        let otherIcon = otherToggler.firstElementChild;
    //        if (otherToggler.classList.contains("navbar-toggler")) {
    //            shadeLine.classList.remove("d-none");
    //            shadeLine.classList.add("d-none");
    //        }
    //        otherIcon.setAttribute("data-icon", otherIconName);
    //    }
    //};

    const toggleIcon = (e, dataIconAttribute) => {
        let icon = e.target.firstElementChild;
        if (icon.getAttribute("data-icon") === "xmark") {
            icon.setAttribute("data-icon", dataIconAttribute);
        } else {
            icon.setAttribute("data-icon", "xmark");
        }
    };
    searchToggler.addEventListener("click", (e) => {
        let icon = "magnifying-glass";
        /*  let otherIcon = "bars";*/
        e.preventDefault();
        /*closeAndOpen(e, otherIcon);*/
        toggleIcon(e, icon);
    });
    navbarToggler.addEventListener("click", (e) => {
        let icon = "bars";
        /*let otherIcon = "magnifying-glass";*/

        if (!e.target.classList.contains("collapsed")) {
            shadeLine.classList.remove("d-none");
        } else {
            shadeLine.classList.add("d-none");
        }
        e.preventDefault();
        /*closeAndOpen(e, otherIcon);*/
        NavbarCloseAndOpen(e);
        toggleIcon(e, icon);
    });

    const footerDropdownBtns = [
        ...document.getElementsByClassName("ftrDropControl"),
    ];
    footerDropdownBtns.map((b) => {
        b.addEventListener("click", (e) => {
            // Shows/hides dropdown menu
            let list = e.target.nextElementSibling;
            list.classList.toggle("d-none");

            // Extends height of footer based off number of dropdowns open
            // If one is open, height will be 570, if 2 then 700, if all 3 then 750
            let footer = document.getElementById("footer");
            let footerLists = [...document.getElementsByClassName("footerList")];
            let shownLists = footerLists.filter(
                (l) => !l.classList.contains("d-none")
            );

            const resetFooterHeight = () => {
                for (let i = 1; i < 4; i++) {
                    footer.classList.remove("footer-h-" + i);
                    footer.classList.remove("footer-h-sm-" + i);
                }
            };

            if (window.innerWidth < 576) {
                if (shownLists.length <= 0) {
                    resetFooterHeight();
                } else if (shownLists.length === 1) {
                    resetFooterHeight();
                    footer.classList.add("footer-h-1");
                } else if (shownLists.length === 2) {
                    resetFooterHeight();
                    footer.classList.add("footer-h-2");
                } else if (shownLists.length === 3) {
                    resetFooterHeight();
                    footer.classList.add("footer-h-3");
                }
            } else if (window.innerWidth < 992) {
                if (shownLists.length <= 0) {
                    resetFooterHeight();
                } else if (shownLists.length === 1) {
                    resetFooterHeight();
                    footer.classList.add("footer-h-sm-1");
                } else if (shownLists.length === 2) {
                    resetFooterHeight();
                    footer.classList.add("footer-h-sm-2");
                } else if (shownLists.length === 3) {
                    resetFooterHeight();
                    footer.classList.add("footer-h-sm-3");
                }
            }
        });
    });

    // // Handles desktop navbar buttons
    // const deskBtns = [...document.getElementsByClassName("deskBtns")];
    // deskBtns.map((b) => {
    //     b.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         const rawBtnList = [...e.target.closest("ul").children].map(
    //             (li) => li.firstElementChild
    //         );
    //         const btnList = rawBtnList.filter(b => b.classList.contains("deskBtns"))
    //         btnList.map((b) => b.classList.remove("current"));
    //         e.target.classList.add("current");
    //         const btnIndex = btnList.indexOf(e.target);
    //         let nearbyLinks = [
    //             ...e.target.closest(".desk-list-container").parentElement.querySelector(".desk-links").children,
    //         ];
    //         nearbyLinks.map((l, index) => {
    //             if (!l.classList.contains("d-none")) {
    //                 l.classList.add("d-none");
    //             }
    //             if (index === btnIndex) {
    //                 l.classList.remove("d-none");
    //             }
    //         });
    //     });
    // });

    // const breakpointShade = window.matchMedia("(min-width:992px)");
    // const breakpointShadeChecker = function () {
    //     if (breakpointShade.matches === true) {
    //         shadeLine.classList.remove("d-none");
    //         shadeLine.classList.add("d-none");
    //         return;
    //     } else {
    //         if (!!navbarToggler.classList.contains("collapsed")) {
    //             shadeLine.classList.remove("d-none");
    //         } else {
    //             shadeLine.classList.remove("d-none");
    //             shadeLine.classList.add("d-none");
    //         }
    //     }
    // };
    // breakpointShade.addEventListener("change", () => {
    //     breakpointShadeChecker();
    // });

    // // ---------------------------- Below block creates mobile navbar ---------------

    // // dSubHeads is an array of arrays, the child arrays are lists of navbar sub-headings "a" tags (ex. Who We Are, Careers)

    // // Create another copy of dSubHeads, but insert a marker where hyperlinks are identified.
    // // Derive dSubGroups from that array to maintain the constant index between the dSubHeads and dSubGroups
    // // The new dSubGroups should have a "false" value in place of where the hyperlinks are located.
    // // Repeat for "Unique" links
    // // IMPT: The "Unique" links must take reference from dSubHeads array of elements NOT innerHtml else will not be able to derive "Unique" link location relative to standard dSubGroups array
    // // IMPT: Cannot just append links to mobile menu, clone first

    // const dSubHeads = [...document.getElementsByClassName("dSubHeads")].map(
    //     (c) => {
    //         let list = [...c.querySelectorAll("li")].map((c) => c.firstElementChild);
    //         return list;
    //     }
    // );

    // // Will return total children
    // let rawDSubGroups = [...document.getElementsByClassName("dSubGroups")].map(
    //     (c) => {
    //         let children = [...c.children].map((c) => c.innerHTML);
    //         return children;
    //     }
    // );

    // let subGroupsNodes = [...document.getElementsByClassName("dSubGroups")].map(
    //     (c) => {
    //         let children = [...c.children];
    //         return children;
    //     }
    // );

    // const copyArray = dSubHeads.flatMap((i) => i);

    // const createDSubGroups = (initialSubGroupsArray) => {
    //     const arrayOfHyperLinkIndexes = copyArray
    //         .map((e, index) => {
    //             if (e.tagName === "A") {
    //                 return index;
    //             }
    //         })
    //         .filter((i) => !!i);
    //     arrayOfHyperLinkIndexes.forEach((i) => {
    //         initialSubGroupsArray.splice(i, 0, false);
    //     });
    //     return initialSubGroupsArray;
    // };

    // const dSubGroups = createDSubGroups(rawDSubGroups);
    // const sortedSubGroupsNodes = createDSubGroups(subGroupsNodes)

    // // This is an array of each of the empty <ul></ul> to append the desktop items to for rmobile
    // const listOfMobileSubHeadsList = [
    //     ...document.getElementsByClassName("mobileSubHeadsList"),
    // ];


    // // Array of all Unique links
    // const listOfUniqueLinks = sortedSubGroupsNodes.map((c) => {
    //     if (!c) {
    //         return [];
    //     } else {
    //         let navLinksContainer = c[0].closest(".navLinksContainer");
    //         let links = [...navLinksContainer.querySelectorAll(".Unique")];
    //         if (links.length == 0) {
    //             return [];
    //         } else {
    //             return links;
    //         }
    //     }
    // });

    // // Triple nest the listOfUniqueLinks to work with current navbar function
    // const tripleNestedListOfUniqueLinks = () => {
    //     let dynamicStartIndex = 0;
    //     let dynamicEndIndex = 0;
    //     let sortedArray = dSubHeads.map((s, index) => {
    //         dynamicEndIndex += s.length;
    //         if (index === 0) {
    //             return listOfUniqueLinks.slice(0, dynamicEndIndex);
    //         } else {
    //             dynamicStartIndex += dSubHeads[index - 1].length;
    //             return listOfUniqueLinks.slice(dynamicStartIndex, dynamicEndIndex);
    //         }
    //     });
    //     return sortedArray;
    // };

    // // This is an array of arrays of arrays of the individual links (yes its split according to the main heads)
    // // ----------- 3 layers ----------
    // // 1st layer: Main headers (About Us, Initiatives, E-Services etc)
    // // 2nd layer: Secondary headers ("Who We Are, Careers, Newsoom, Public Consulation" under main header "About Us", etc)
    // // 3rd layer: Sub headers ("About SkillsFuture, Members, Education Members, Private bla bla" under secondary header "Who We Are" etc)
    // const tripleNestedArray = () => {
    //     let dynamicStartIndex = 0;
    //     let dynamicEndIndex = 0;
    //     let sortedArray = dSubHeads.map((s, index) => {
    //         dynamicEndIndex += s.length;
    //         if (index === 0) {
    //             return dSubGroups.slice(0, dynamicEndIndex);
    //         } else {
    //             dynamicStartIndex += dSubHeads[index - 1].length;
    //             return dSubGroups.slice(dynamicStartIndex, dynamicEndIndex);
    //         }
    //     });
    //     return sortedArray;
    // };

    // // Call both triple nesting functions here once and assign it here to reduce loading issues
    // const sortedListOfLinks = tripleNestedArray();
    // const sortedListOfUniqueLinks = tripleNestedListOfUniqueLinks();

    // // Call this function to recreate the mobile navbar based off the desktop navbar
    // const createMobileNavbar = () => {
    //     // Each iteration through the map of listOfMobileSubHeadsList will
    //     // perform operations on content within EACH of the main headers
    //     // (currently there are 3: "About Us", "Inititaties", "E-Services". But it will work in the future for any additional MAIN headers)
    //     listOfMobileSubHeadsList.map((c, index) => {
    //         // Clears any html inside "mobileSubHeaderList" element
    //         c.innerHTML = "";

    //         let subHeadersAllContent = dSubHeads[index].map((btnOrLink, i) => {
    //             let li = document.createElement("li");
    //             // Creates subheader button
    //             const createBtn = () => {
    //                 let btn = document.createElement("button");
    //                 li.classList.add("sub-container", "d-flex", "flex-column");
    //                 btn.classList.add("dropdown-toggle", "d-flex");
    //                 btn.setAttribute("type", "button");
    //                 btn.setAttribute("data-bs-toggle", "dropdown");
    //                 btn.setAttribute("data-bs-auto-close", "outside");
    //                 btn.setAttribute("aria-expanded", "false");
    //                 btn.textContent = btnOrLink.textContent;
    //                 return btn;
    //             };

    //             let currentList = sortedListOfLinks[index][i];
    //             let currentUniqueLinks = sortedListOfUniqueLinks[index][i];

    //             // Creates subheader list
    //             const createList = () => {
    //                 let dropdownDiv = document.createElement("div");
    //                 let ul = document.createElement("ul");

    //                 dropdownDiv.classList.add("dropdown-menu");
    //                 ul.classList.add("li-style-none", "row");

    //                 currentList.map((link) => {
    //                     let li = document.createElement("li");
    //                     li.classList.add("col-sm-6", "py-2");
    //                     let aString = link.toString();
    //                     li.innerHTML = aString;
    //                     ul.appendChild(li);
    //                 });

    //                 currentUniqueLinks.map((uniqueLink) => {
    //                     let div = document.createElement("div");
    //                     let li = document.createElement("li");
    //                     div.classList.add(
    //                         "exclude",
    //                         "init-btn",
    //                         "d-flex",
    //                         "justify-content-center",
    //                         "my-3"
    //                     );
    //                     let uaString = uniqueLink.outerHTML;
    //                     div.innerHTML = uaString;
    //                     li.appendChild(div);
    //                     ul.appendChild(li);
    //                 });
    //                 dropdownDiv.appendChild(ul);

    //                 return dropdownDiv;
    //             };
    //             // Appends button and list to the created "li" element
    //             if (btnOrLink.tagName === "A") {
    //                 let mobileLink = btnOrLink.cloneNode("true");
    //                 li.appendChild(mobileLink);
    //             } else {
    //                 li.appendChild(createBtn());
    //                 li.appendChild(createList());
    //             }
    //             return li;
    //         });
    //         subHeadersAllContent.map((li) => {
    //             c.appendChild(li);
    //         });
    //     });
    // };
    // createMobileNavbar();
    // ---------------------------- Above block creates mobile navbar ---------------

    // -------- Below block fixes sgds masthead AND creates and adds the font resizer to it

    const masthead = document.getElementsByTagName("sgds-masthead");
    const shdw = [...masthead[0].shadowRoot.children][0];
    shdw.style.cssText += "width:100%;z-index:99;";
    const shdwChildren = [...shdw.children];
    shdwChildren.map(
        (c) =>
        (c.style.cssText +=
            "max-width:initial;padding-left:12px;padding-right:12px;")
    );
    // shdwChildren.map((c) => {
    //     let row = c.querySelector(".row");
    //     row.style.cssText += "margin:0px;padding-left:0px;padding-right:0px";
    //     let col = c.querySelector(".col");
    //     col.style.cssText += "padding-left:0px;padding-right:0px;"
    // })
    // Create font-adjustor widget
    const mastheadLayout = shdw.querySelector(".masthead-layout");
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("font-btns-container");
    const fontAdjust = (e) => {
        const btnText = e.target.textContent;
        const body = [...document.getElementsByTagName("body")][0];
        let currentFont = parseFloat(
            window.getComputedStyle(body).getPropertyValue("font-size")
        );
        switch (btnText) {
            case "A+":
                if (currentFont < 24) {
                    currentFont += 4;
                }
                body.style.fontSize = currentFont + "px";
                break;
            case "A-":
                if (currentFont > 8) {
                    currentFont -= 4;
                }
                body.style.fontSize = currentFont + "px";
                break;
            case "Reset":
                body.style.fontSize = "16px";
                break;
        }
    };
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            let desc = document.createElement("p");
            let descText = document.createTextNode("Change text size:");
            desc.appendChild(descText);
            btnContainer.appendChild(desc);
        } else {
            let btn = document.createElement("button");
            let btnText = "";
            if (i == 1) {
                btnText = document.createTextNode("A-");
                btn.setAttribute(
                    "aria-label",
                    "Reduce font size of text on page by 4px"
                );
            } else if (i == 2) {
                btnText = document.createTextNode("A+");
                btn.setAttribute(
                    "aria-label",
                    "Increase font size of text on page by 4px"
                );
            } else {
                btnText = document.createTextNode("Reset");
                btn.setAttribute(
                    "aria-label",
                    "Reset font size of text on page back to normal (16px)"
                );
            }
            btn.appendChild(btnText);
            btn.addEventListener("click", fontAdjust);
            btnContainer.appendChild(btn);
        }
    }
    mastheadLayout.appendChild(btnContainer);
    const style = document.createElement("style");
    style.textContent = `
        .panel {
          background-color: light-dark(rgb(243, 243, 243), rgb(26, 26, 26)) !important;
        }

        .font-btns-container {
          align-items: center;
          margin-left: auto;
          display:none;
        }

        @media (min-width:768px) {
            .font-btns-container {
                display:flex;
            }
        }

        .font-btns-container p {
          margin-bottom: 0;
          margin-top: 0;
        }

        .font-btns-container button {
          margin-left: 5px;
          border: none;
          background: #6c757d30;
          padding-left: 10px;
          padding-right:10px;
          color: black!important;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .font-btns-container button:hover {
          color: blue;
        }

        .masthead-layout: {
          align-items: center;
        }
        `;
    shdw.appendChild(style);

    // -------- Above block fixes sgds masthead AND creates and adds the font resizer to it

    // Return to top btn
    function ReturnToTopBtn() {
        const btn = document.createElement("button");
        btn.className = "scroll-btn";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-arrow-up";
        btn.appendChild(icon);

        document.body.appendChild(btn);

        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            if (scrollY > 300) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        });

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    ReturnToTopBtn();

    function NavAndMainMobileSpacing() {
        let navBtn = document.querySelector(".navbar-toggler");
        let navbar = document.querySelector(".navbar");
        let main = document.querySelector("main");
        navBtn.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                main.classList.toggle("mobile-nav-show-main-padding");
                navbar.classList.toggle("mobile-nav-show");
            }
        });
    }

    NavAndMainMobileSpacing();
});

function isValidHash(hash) {
    // Define a regex pattern for allowed hashes (e.g., alphanumeric + dashes)
    const validPattern = /^[a-zA-Z0-9\-_() ]+$/;
    return validPattern.test(hash);
}


}
/*
     FILE ARCHIVED ON 14:39:11 Aug 03, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:26:41 Oct 05, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.912
  exclusion.robots: 0.022
  exclusion.robots.policy: 0.01
  esindex: 0.011
  cdx.remote: 27.826
  LoadShardBlock: 49.031 (3)
  PetaboxLoader3.datanode: 58.161 (4)
  PetaboxLoader3.resolve: 7.907
  load_resource: 46.064
*/