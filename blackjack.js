$(document).ready(function() {
  var dealerHand = [];
  var playerHand = [];
  var deck = newDeck();
  shuffle(deck);
  console.log(deck);


  $('#deal-button').click(function() {
    dealCards(deck);
    console.log(deck);
    console.log(playerHand);
    console.log(dealerHand);
  });

  $('#hit-button').click(function () {
    var hitcard = deck.pop();
    playerHand.push(hitcard);
    $('#player-hand').append('<img class="card" src="' + getCardImageUrl(hitcard) + '">');
    $('#player-points').text(calculatePoints(playerHand));
    var total = calculatePoints(playerHand);
    if (total > 21) {
      console.log(total);
      $('#messages').text('You busted sucka!');
      $('#deal-button').prop('disabled', true);
      $('#hit-button').prop('disabled', true);
    }
    var total2 = calculatePoints(dealerHand);
    if (total2 > 21) {
      console.log(total);
      $('#messages').text('Dealer busted, you win!');
    }
  });

  $('#stand-button').click(function () {
    $('#deal-button').prop('disabled', true);
    $('#hit-button').prop('disabled', true);
    var dealerTotal = calculatePoints(dealerHand);
    var playerTotal = calculatePoints(playerHand);
    if (dealerTotal < playerTotal && dealerTotal < 21) {
      var hitcard = deck.pop();
      dealerHand.push(hitcard);
      $('#dealer-hand').append('<img class="card" src="' + getCardImageUrl(hitcard) + '">');
      $('#dealer-points').text(calculatePoints(playerHand));

    }
  });



  // function shuffle(deck){
  //
  // }


  function dealCards(deck) {  //deals the cards
    var pcard1 = deck.pop();
    playerHand.push(pcard1);
    $('#player-hand').append('<img class="card" src="' + getCardImageUrl(pcard1) + '">');
    var pcard2 = deck.pop();
    playerHand.push(pcard2);
    $('#player-hand').append('<img class="card" src="' + getCardImageUrl(pcard2) + '">');
    $('#player-points').text(calculatePoints(playerHand));

    var dcard1 = deck.pop();
    dealerHand.push(dcard1);
    $('#dealer-hand').append('<img class="card" src="' + getCardImageUrl(dcard1) + '">');
    var dcard2 = deck.pop();
    dealerHand.push(dcard2);
    $('#dealer-hand').append('<img class="card" src="' + getCardImageUrl(dcard2) + '">');
    $('#dealer-points').text(calculatePoints(dealerHand));
  }

  function shuffle(deck) {  //shuffles the deck
   var currentIndex = deck.length, temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {

     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;

     // And swap it with the current element.
     temporaryValue = deck[currentIndex];
     deck[currentIndex] = deck[randomIndex];
     deck[randomIndex] = temporaryValue;
   }

   return deck;
  }
  console.log(shuffle(deck));


  // function bust(sum) {
  //   var total = calculatePoints(hand);
  //   if (total > 21) {
  //     $('#message').append('You busted sucka!');
  //   } else {
  //     return;
  //   }
  // }

  function getCardImageUrl(card) {  //renders the image name of the cards
    var name = card.point;
      if (card.point === 11) {
        name = 'jack';
    } else if (card.point === 12) {
      name = 'queen';
    } else if (card.point === 13) {
      name = 'king';
    } else if (card.point === 1) {
      name = 'ace';

    }
    return 'images/' + name + '_of_' + card.suit + '.png';
  }

  function calculatePoints(hand) { //calculates the points for a hand
    var arr = hand;
    var combine = function(a, b) {
      console.log('a=', a, 'b=', b);
      return a + b.point;
    };

    var sum = arr.reduce(combine, 0);
    return sum;
  }

  function newDeck() {  //generates the deck
   var deck = [];
   var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
   for (var i = 1; i <= 13; i++) {
     for (var j = 0; j <= 3; j++) {
       deck.push({'point': i, 'suit': suits[j]});
     }
   }
   return deck;
  }

});