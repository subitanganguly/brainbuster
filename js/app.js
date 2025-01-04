import { Toast } from '@capacitor/toast';
import { App } from '@capacitor/app';

let backPressedOnce = false;

async function showToast(message) {
    await Toast.show({
        text: message,
        duration: 'short', // Other options: 'long'
    });
}

document.addEventListener('deviceready', () => {
    App.addListener('backButton', async (event) => {
        // Check if there's a history stack for navigation
        if (window.history.length > 1) {
            window.history.back(); // Navigate back in browser history
        } else {
            // Handle "exit app" logic
            if (backPressedOnce) {
                App.exitApp(); // Exit the app
            } else {
                backPressedOnce = true;
                await showToast("Press back again to exit");
                setTimeout(() => {
                    backPressedOnce = false; // Reset after 2 seconds
                }, 2000);
            }
        }
    });
});
