// Emulates a server replying to messages...
// Would need to be implemented away from the client in a real world scenario
import * as types from '../store/mutation-types'
import $ from 'jquery'

export const server = {
    /**
     * Object to store the current inputs as we proceed.
     */
    registrationStatus: {
        name: null,
        emailAddress: null,
        password: null
    },
    /**
     * Provide the current step for the input parser
     */
    getCurrentStep: function() {
        if (this.registrationStatus.name === null) {
            return {
                field: 'name',
                label: 'name'
            }
        }
        else if (this.registrationStatus.emailAddress === null) {
            return {
                field: 'emailAddress',
                label: 'email address'
            }
        }
        else if (this.registrationStatus.password === null) {
            return {
                field: 'password',
                label: 'password'
            }
        }
    },
    /**
     * No real validation happening here. They can't reply with an empty character unless they're hacking us apart anyway.
     */
    validateName: function(name) {
        if (!name.length) {
            return false
        }

        return true
    },
    /**
     * Just make sure the email address looks reasonable.
     */
    validateEmail: function(email) {
        // Shamelessly borrowed from http://stackoverflow.com/a/46181
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    },
    /**
     * Password validation must just be 6 characters minimum, or we can accept "generate" and create a random password.
     */
    validatePassword: function(password) {
        if (password.length < 6) {
            return false
        }

        if (password === 'generate') {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 12; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        }

        return true
    },
    /**
     * This is all hardcoded and very basic, in a real production environment a server would handle all of this.
     * We would also want to use something like promises to queue up multiple responses from the server in succession.
     */
    receiveInput: function (message, store) {
        switch (this.getCurrentStep().field) {
        case 'name':
            if (this.validateName(message)) {
                this.sendResponse("Got it! Thanks, " + message + "!", store)
                this.registrationStatus.name = message

                setTimeout(() => {
                    this.sendResponse("Next, what is the best email address to reach you at?", store)
                }, 3000)
            }
            else {
                this.sendResponse("Hmmm... I didn't quite get that. Could you try again?", store)
            }
            break;

        case 'emailAddress':
            if (this.validateEmail(message)) {
                this.sendResponse("Sweet! We'll put that address on file for you!", store)
                this.registrationStatus.emailAddress = message

                setTimeout(() => {
                    this.sendResponse("Finally, we just need to set up your password. You can either provide one now, or we can generate one for you (type 'generate')?", store)
                }, 3000)
            }
            else {
                this.sendResponse("You sure that email is correct? It doesn't quite look right to me...", store)
            }
            break;

        case 'password':
            let valid = this.validatePassword(message)

            if (valid === true) {
                this.sendResponse("Great, we've got your password saved.", store)
                this.finishChat(store)
            }
            else if (valid === false) {
                this.sendResponse("Whoops! Looks like your password isn't quite good enough. You'll need to provide a password at least 6 characters long to continue! We can generate one for you if you'd like, just type 'generate', or try entering another yourself.")
            }
            else {
                this.sendResponse("No problem! Your generated password is: <strong>" + valid + "</strong>", store)
                this.finishChat(store)
            }
            break;

        default:
            // Should be unreachable!
            this.sendResponse('Something weird happened, try again later?', store)
        }
    },
    /**
     * Finish sequence. Disable the input.
     */
    finishChat: function (store) {
        $('#text-input').attr('disabled', 'disabled')

        setTimeout(() => {
            this.sendResponse("Looks like we're all set!<br><br><em>Your account details are as follows:</em><br><strong>Name:</strong> " + this.registrationStatus.name + "<br><strong>Email:</strong> " + this.registrationStatus.emailAddress + "<br><strong>Password:</strong> " + this.registrationStatus.password, store)
        }, 3000)

        setTimeout(() => {
            this.sendResponse("Thanks for signing up!", store)
        }, 6000)
    },
    /**
     * Buffer a response from the server. Emulates a relatively slow connection (1-3 second respones from server)
     */
    sendResponse: function (response, store) {
        store.commit(types.SERVER_REPLYING)

        // mimics a slow-ish server response
        setTimeout(() => {
            store.dispatch('serverSendMessage', response)
            store.commit(types.SERVER_NOT_REPLYING)
        }, 1000 + (Math.random() * 2000))
    }
}

// We're using this as a vuex extension, subscribe to the store here!
export default store => {
    store.subscribe((mutation, state) => {
        // Subscribe to chat/SEND_MESSAGE, but only if the payload's user is 'user'
        if (mutation.type === types.SEND_CHAT_MESSAGE && mutation.payload.user === 'user') {
            server.receiveInput(mutation.payload.message, store)
        }
    })
}
