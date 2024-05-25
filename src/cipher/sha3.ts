let grid: number[][] = Array.from({ length: 5 }, () => Array(5).fill(0));

function rotateClockwise(x: number, y: number): number {
    return (x << y) | (x >>> (32 - y));
}

function bitwiseXOR(a: number, b: number): number {
    return a ^ b;
}

function resetGrid() {
    grid = Array.from({ length: 5 }, () => Array(5).fill(0));
}

function absorbData(data: number[]) {
    for (let i = 0; i < data.length; i++) {
        const row = i % 5;
        const col = Math.floor(i / 5) % 5;
        grid[row][col] = bitwiseXOR(grid[row][col], data[i]);
    }
}

function scrambleState() {
    for (let i = 0; i < 24; i++) {
        let newGrid = Array.from({ length: 5 }, () => Array(5).fill(0));
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                newGrid[row][col] = rotateClockwise(grid[row][col], (row + col) % 32);
            }
        }
        grid = newGrid;
    }
}

function squeezeOutput(): number[] {
    let output: number[] = [];
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            output.push(grid[row][col]);
            if (output.length >= 8) return output;
        }
    }
    return output;
}

function padInput(input: string): number[] {
    const data = Array.from(input).map(char => char.charCodeAt(0));
    data.push(1);
    while (data.length % 25 !== 0) {
        data.push(0);
    }
    return data;
}

export function keccakHash(input: string): string {
    resetGrid();
    const paddedData = padInput(input);
    absorbData(paddedData);
    scrambleState();
    const hashedOutput = squeezeOutput();
    return hashedOutput.map(n => n.toString(16).padStart(8, '0')).join('');
}
