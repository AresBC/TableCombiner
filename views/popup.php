<div>
    <div id="box"></div>
</div>

<style>
    #box {
        background-color: darkblue;
        width: 200px;
        height: 100px;
        margin: 100px;
    }

    #popup {
        position: absolute;
        background-color: red;
        width: 50px;
        height: 50px;
    }
</style>

<script>
    const get = x => document.querySelector(x)
    const create = x => document.createElement(x)

    class Popup {
        id
        ele

        constructor(id) {
            this.id = id
            this.ele = create("div")
            this.ele.id = this.id
        }

        notify(ev) {
            console.log("notify")
            this.ele.style.top = ev.clientY + "px"
            this.ele.style.left = ev.clientX + "px"
        }
    }

    class ReactiveBox {
        ele
        popup

        constructor(ele, popup) {
            this.ele = ele
            this.popup = popup
            this.ele.appendChild(this.popup.ele)
            this.updateOnHover()
        }


        updateOnHover() {
            const updatePopup = (ev) => {
                const boundingRect = this.ele.getBoundingClientRect()
                if (
                    ev.clientY < boundingRect.y
                    || ev.clientY > boundingRect.y + boundingRect.height
                    || ev.clientX < boundingRect.x
                    || ev.clientX > boundingRect.x + boundingRect.width
                ) {
                    document.removeEventListener("mousemove", updatePopup)
                    this.popup.ele.style.display = "none"
                    return
                }
                this.popup.notify(ev)
            }

            const inside = new CustomEvent('inside', {
                detail: {
                    name: 'dog'
                }
            });

            this.ele.addEventListener("mouseover", () => {
                console.log(1)
                this.popup.ele.style.display = "block"
                document.addEventListener("mousemove", updatePopup)
            })

            this.ele.addEventListener("mouseleave", () => {
                console.log(2)
                document.removeEventListener("mousemove", updatePopup)
            })
        }
    }


    const box = get("#box")
    const popup = new Popup("popup")
    const reactiveBox = new ReactiveBox(box, popup)

</script>