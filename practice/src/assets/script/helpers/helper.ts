import {TABLE_ROW_ACTIVE} from '../constants/classname'
/**
 * @desc Get element
 * @param {string} selector classname or id of element
 * @return {element} Return the element
 */
const getElement = (selector:string) =>{
    return document.querySelector(selector)
}

/**
 * @desc Get elements
 * @param {selector} string classname or id of element
 * @return {NodeListOf<HTMLElement>} Return the elements
 */
const getElementAll = (selector:string): NodeListOf<HTMLElement> =>{
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>
}

/**
 * @desc Create element
 * @param {string} tag of element
 * @param {string} className of element
 * @return {element} Return the element
 */
const createElement = (tag: string, className: string): HTMLElement =>{
    const element = document.createElement(tag)
    if (className) {
        element.classList.add(className)
    }
    return element as HTMLElement
}

//Validate
/**
 * @desc Validate url of avatar
 * @param {string} url of element
 * @param {HTMLElement} element of element
 * @return {boolean} Return true or false
 */
const validateAvatarUrl = (url:string, element: HTMLElement): boolean =>{
    element.style.backgroundImage = 'none'
    element.innerHTML = ''
    if(url !== '') {
        return true
    }
    return false
}

/**
 * @desc Validate status and add className for element
 * @param {string} status of user
 * @param {HTMLElement} element
 * @param {string} className of element
 */
const validateStatus = (status: boolean, element: HTMLElement, className: string) =>{
    if(status) {
        element.textContent = 'Active'
        element.classList.add(className)
    }
    else {
        element.textContent = 'Not active'
        if(element.classList.contains(className)) {
            element.classList.remove(className)
        }
    }
}

/**
 * @desc Check value email and add value email for element
 * @param {string} email email of user
 * @param {HTMLElement} element
 */
const validateEmail = (email:string, element: HTMLElement) =>{
    if(email !== '') {
        element.textContent = email
    }
    else {
        element.textContent = 'Unknown'
    }
}

/**
 * @desc Set checked for checkbox element
 * @param {boolean} status of user
 * @param {HTMLElement} element
 */
const toggleStatus = (status: boolean, element: HTMLInputElement) =>{
    element.checked = status
}

/**
 * @desc Get value of input element
 * @param {HTMLElement} element
 * @return {string} Return value of input element
 */
const getInput = (element: HTMLInputElement): string =>{
    return element.value
}

/**
 * @desc Get value of checkbox element
 * @param {HTMLElement} element
 * @return {string} Return value of input checkbox element
 */
const getCheckbox = (element: HTMLInputElement): boolean =>{
    return element.checked
}

/**
 * @desc Get id of HTML element
 * @param {HTMLElement} element
 * @return {int} Return id of HTML element
 */
const getId = (element: HTMLElement): number =>{
    return parseInt(element.id)
}

/**
 * @desc Find parent of HTML element
 * @param {HTMLElement} element
 * @return {HTMLElement} Return HTML element
 */
const findParent = (element: HTMLElement): HTMLElement =>{
    return element.parentElement as HTMLElement
}

/**
 * @desc Find row element constain class name active
 * @param {string} className
 * @return {HTMLElement} Return HTML element
 */
const findRowActive = (className: string): HTMLElement => {
    return getElement('.'+className) as HTMLElement
}

/**
 * @desc Get id row element constain class name active
 * @return {number} Number
 */
 const getIdRowActive = (): number => {
    return getId(findRowActive(TABLE_ROW_ACTIVE))
}

//Event
/**
 * @desc Add event for HTML element
 * @param {HTMLElement} target
 * @param {string} type Type of event
 * @param {Function} callback
 */
const on = (target: HTMLElement, type: string, callback: (event: Event) => void) => {
    target.addEventListener(type, callback)
}

/**
 * @desc Bind event for element target
 * @param {HTMLElement} target
 * @param {string} selector class name or id of HTML element
 * @param {string} type type of event
 * @param {callback} handler
 */
const delegate = (target: HTMLElement, selector: string, type: string, handler: Function) =>{
    const dispatchEvent = (event: Event) => {
        const targetElement = event.target as HTMLElement
        const potentialElements = target.querySelectorAll(selector)
        let i = potentialElements.length
        while (i--) {
            if((potentialElements[i] === targetElement)) {
                handler(event, targetElement)
                break;
            }
            else if((potentialElements[i] === findParent(targetElement))) {
                handler(event, findParent(targetElement))
                break;
            }
        }
    }
    on(target, type, dispatchEvent)
}

export {
    getElement,
    getElementAll,
    createElement,
    validateAvatarUrl,
    validateStatus,
    validateEmail,
    toggleStatus,
    getInput,
    getCheckbox,
    getId,
    findRowActive,
    getIdRowActive,
    on,
    delegate
}