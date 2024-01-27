import {ChildProcess} from "child_process";

export const isEmulatorRunning = (emulator: ChildProcess): Promise<void> => {
    const { stdout } = emulator;
    if (!stdout) {
        throw new Error('No stdout available for emulator');
    }
    stdout.pipe(process.stdout);
    return new Promise(resolve => {
        stdout.on('data', (data) => {
            if (data.includes('Other reserved ports:')) {
                resolve();
            }
        });
    });
};
