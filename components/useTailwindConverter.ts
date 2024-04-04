import {ref} from 'vue';
import {toJSON} from 'css-convert-json';
import {useBootstrapFramework} from "~/components/useBootstrapFramework";

// Interface for Attributes with a more strict type definition
interface Attributes {
    [index: string]: string | number | boolean;
}

// Composable function for converting Bootstrap to Tailwind CSS and applying it to HTML and CSS
export function useTailwindConverter() {
    const cssText = ref('');
    const htmlText = ref('');
    const convertedHtmlText = ref('');

    // Function to convert CSS classes from Bootstrap to Tailwind CSS
    function convertBootstrapToTailwind(className: string): string {
        const { general, navs, pagination } = useBootstrapFramework();
        const allMappings = { ...general(), ...navs(), ...pagination() };
        return allMappings[className] || className;
    }

    // Function to convert CSS properties to Tailwind CSS classes
    function convertCssToTailwind(attributes: Attributes): string {
        let result: string[] = [];
        // Conversion logic here...
        return result.join(' ');
    }

    // Function to convert CSS to JSON format
    function cssToJson(plainText: string): Object[] {
        const cssJson = toJSON(plainText);
        return Object.keys(cssJson.children).map(className => ({
            [className]: cssJson.children[className].attributes,
        }));
    }

    // Function to convert CSS to JSON and then to Tailwind CSS
    function cssToJsonAndTailwind(plainText: string): Object[] {
        const cssJson = toJSON(plainText);
        return Object.keys(cssJson.children).map(className => {
            const convertedClassName = convertBootstrapToTailwind(className);
            let convertedAttributes = convertCssToTailwind(cssJson.children[className].attributes);
            return { [convertedClassName]: convertedAttributes };
        });
    }

    // Function to inject converted classes into HTML
    function injectClass(htmlText: string, cssObject: Object[]): string {
        const allClasses = extractClassesFromHtml(htmlText);
        let convertedClassesMap = allClasses.reduce((acc, className) => ({
            ...acc,
            [className]: convertBootstrapToTailwind(className),
        }), {});

        // Additional logic for injecting CSS object conversions into HTML...
        return htmlText.replace(/class="([^"]*)"/g, (match, classGroup) => {
            let convertedClassNames = classGroup.split(' ').map((className: string | number) => convertedClassesMap[className] || className).join(' ');
            return `class="${convertedClassNames}"`;
        });
    }

    // Function to extract all unique class names from an HTML string
    function extractClassesFromHtml(htmlString: string): string[] {
        let tempDivElement = document.createElement('div');
        tempDivElement.innerHTML = htmlString;
        let allElements = tempDivElement.querySelectorAll('*[class]');
        let allClasses: string[] = [];

        allElements.forEach(element => {
            element.className.split(/\s+/).forEach(className => {
                if (!allClasses.includes(className)) {
                    allClasses.push(className);
                }
            });
        });

        return allClasses;
    }

    // Main function to convert and inject CSS and HTML transformations
    const convertAndInject = () => {
        const cssObject = cssToJsonAndTailwind(cssText.value);
        convertedHtmlText.value = injectClass(htmlText.value, cssObject);
    };

    // Exposing properties and functions
    return {
        cssText,
        htmlText,
        convertedHtmlText,
        convertAndInject,
    };
}
