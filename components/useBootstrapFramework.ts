import {computed, ref} from 'vue';

export function useBootstrapFramework() {
    const mediaOptions = ref({
        xs: 'sm',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
        print: 'print',
    });

    const spacings = ref({
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '4',
        '4': '6',
        '5': '12',
    });

    const grid = ref({
        '1': '1/6',
        '2': '1/5',
        '3': '1/4',
        '4': '1/3',
        '5': '2/5',
        '6': '1/2',
        '7': '3/5',
        '8': '2/3',
        '9': '3/4',
        '10': '4/5',
        '11': '5/6',
        '12': 'full',
    });

    const colors = ref({
        primary: 'blue-600',
        secondary: 'gray-600',
        success: 'green-500',
        danger: 'red-600',
        warning: 'yellow-500',
        info: 'teal-500',
        light: 'gray-100',
        dark: 'gray-900',
        white: 'white',
        muted: 'gray-700',
    });

    const defaultCSS = computed(() => ({
        'h1': '',
        'fieldset': '',
        'del': '',
        'a': '',
        'p': '',
        // Add more mappings as needed
    }));

    function general() {
        return {
            'container-fluid': 'container max-w-full mx-auto sm:px-4',
            // Continue mapping Bootstrap classes to TailwindCSS classes
        };
    }

    function navs() {
        const items: Record<string, any> = {
            nav: 'flex flex-wrap list-none pl-0 mb-0',
            'nav-tabs': 'border border-t-0 border-r-0 border-l-0 border-b-1 border-gray-200',
            'nav-pills': '',
            'nav-fill': '',
            'nav-justified': '',
            'navbar': 'relative flex flex-wrap items-center content-between py-3 px-4',
            'navbar-brand': 'inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap',
            'navbar-nav': 'flex flex-wrap list-reset pl-0 mb-0',
            'navbar-text': 'inline-block pt-2 pb-2',
            'navbar-dark': 'text-white',
            'navbar-light': 'text-black',
            'navbar-collapse': 'flex-grow items-center',
            'navbar-expand': 'flex-no-wrap content-start',
            'navbar-expand-{regex_string}': '',
            'navbar-toggler': 'py-1 px-2 text-md leading-normal bg-transparent border border-transparent rounded',
            'collapse': 'hidden',
            'navbar-toggler-icon': 'px-5 py-1 border border-gray-600 rounded',
        };

        return items;
    }
    function pagination(): Record<string, string> {
        return {
            pagination: 'flex list-reset pl-0 rounded',
            'pagination-lg': 'text-xl',
            'pagination-sm': 'text-sm',
            'page-link': 'relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200',
        };
    }

    return {
        mediaOptions,
        spacings,
        grid,
        colors,
        defaultCSS,
        general,
        navs,
        pagination,
    };
}
