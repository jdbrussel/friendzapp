import * as Icon_Outline from '@heroicons/react/24/outline'
import * as Icon_Solid from '@heroicons/react/24/solid'


// https://heroicons.com/

const IconOutline = ({ icon, classname }) => {
    let { ...icons } = Icon_Outline;
    const TheIcon = icons[icon]
    return (
        <>
            <TheIcon className={classname} aria-hidden="true" />
        </>
    )
}

const IconSolid = ({ icon, classname }) => {
    let { ...icons } = Icon_Solid;
    const TheIcon = icons[icon]
    return (
        <>
            <TheIcon className={classname} aria-hidden="true" />
        </>
    )
}

export { IconOutline, IconSolid }; 