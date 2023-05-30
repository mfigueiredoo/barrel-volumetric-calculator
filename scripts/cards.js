let cards = document.getElementsByClassName("card")

function setCardVisibleById(cardId) {
    if (cards[cardId] == undefined) return

    for(let i = 0; i < cards.length;i++) {
        cards[i].style = "display: none"
    }

    cards[cardId].style = "display: flex"

    console.log(cardId);

}

setCardVisibleById("card-001")


export default {
    setCardVisibleById
}