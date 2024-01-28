interface Data {
    id: number;
};



class MemDatabase<T extends Data> {
    private data: T[] = [];

    insert = (data: Omit<T, 'id'>) => {
        const id = (this.data[0]?.id ?? 0) + 1;
        this.data.push({
            ...data,
            id,
        } as T);
    }

    readAll = () => {
        return this.data;
    };

    update = (id: number, data: Omit<T, 'id'>) => {
        const index = this.data.findIndex((d) => d.id === id);
        if (index < 0) {
            throw new Error(`Could not find item with id '${id}'`);
        }
        this.data[index] = {
            ...this.data[index],
            id,
            ...data,
        } as T;
    };

    remove = (id: number) => {
        const index = this.data.findIndex((d) => d.id === id);
        if (index < 0) {
            throw new Error(`Could not find item with id '${id}'`);
        }
        this.data.splice(index, 1);
    };
}

export default MemDatabase;
