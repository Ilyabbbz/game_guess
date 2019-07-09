const enemies = [
    {
        id: 1,
        name: 'BowMan',
        hp: 100,
        maxHp: 100,
        dmg: 10
    },
    {
        id: 2,
        name: 'SwordMan',
        hp: 100,
        maxHp: 100,
        dmg: 10
    },
    {
        id: 3,
        name: 'Angry',
        hp: 100,
        maxHp: 100,
        dmg: 10
    }
]

const user = {
    id: 1337,
    name: 'You',
    hp: 100,
    maxHp: 100,
    dmg: 10
}

let display = $('#display')
let helloScreen = $('#helloScreen')
let chooseEnemyScreen = $('#chooseEnemyScreen')
let yourTurnScreen = $('#yourTurnScreen')
let dodgeScreen = $('#dodgeScreen')
let resultScreen = $('#resultScreen')


let currentEnemy = {}
let currentUserState = {}
let currentResult = ""

display.html('')

const helloScreenCreate = () => {
    display.html(helloScreen)
    $('#helloButton').click(() => {
        redrawPage(chooseEnemyScreenCreate)
    })
}

const chooseEnemyScreenCreate = () => {
    display.html(chooseEnemyScreen)
    $('.to-main-button').click(() => {
        redrawPage(helloScreenCreate)
    })
    let enemyList = $('#enemyList')
    enemyList.html('')
    enemies.forEach(enemy => {
        let enemyItem = $('<li>')
        enemyItem.html(`Enemy #${enemy.id}: ${enemy.name}`)

        enemyItem.attr('id', `enemy${enemy.id}`)
        enemyItem.click(() => {
            currentEnemy = enemy
            currentUserState = user
            redrawPage(fightScreenCreate)
        })
        enemyList.append(enemyItem)
    })
}

const fightScreenCreate = () => {
    display.html(yourTurnScreen)

    $('#userHp').attr('max', currentUserState.maxHp)
    $('#enemyHp').attr('max', currentEnemy.maxHp)
    $('#userHp').attr('value', currentUserState.hp)
    $('#enemyHp').attr('value', currentEnemy.hp)

    $('#enemyNameHp').text(currentEnemy.name)

    let correctHitButton = Math.floor(Math.random() * (4 - 1)) + 1

    console.log(correctHitButton)

    if (currentEnemy.hp <= 0) {
        currentEnemy.hp = currentEnemy.maxHp
        currentUserState.hp = currentUserState.maxHp
        for(let i = 0; i < enemies.length; i++){ 
            if ( enemies[i].name == currentEnemy.name) {
                enemies.splice(i, 1);
            }
        }
        currentResult = "You win"
        redrawPage(resultScreenCreate)
    }
    if (currentUserState.hp <= 0) {
        currentEnemy.hp = currentEnemy.maxHp
        currentUserState.hp = currentUserState.maxHp
        currentResult = "You lose"
        redrawPage(resultScreenCreate)
    }
    
    for (let i = 1; i <= 3; i++) {
        $(`#hitButton${i}`).click(event => {
            console.log(event.target.id)
            if (event.target.id != `hitButton${correctHitButton}`) {
                redrawPage(dodgeScreenCreate)
            } else {
                currentEnemy.hp -= currentUserState.dmg
                redrawPage(fightScreenCreate)
            }
        })
    }

}

const dodgeScreenCreate = () => {
    display.html(dodgeScreen)

    let correctDodgeButton = Math.floor(Math.random() * (3 - 1)) + 1
    console.log(correctDodgeButton)
    

    for (let i = 1; i <= 2; i++) {
        $(`#dodgeButton${i}`).click(event => {
            console.log(event.target.id)
            if (event.target.id != `dodgeButton${correctDodgeButton}`) {
                currentUserState.hp -= currentEnemy.dmg
                redrawPage(fightScreenCreate)
            } else {
                redrawPage(fightScreenCreate)
            }
        })
    }
}

const resultScreenCreate = () => {
    display.html(resultScreen)

    $('#resultText').html(currentResult)

    currentResult = ""

    setTimeout("redrawPage(chooseEnemyScreenCreate)", 2000);
}

const redrawPage = (func) => {
    display.html('')
    func()
}

redrawPage(helloScreenCreate)






