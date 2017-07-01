const write = jest.fn();

module.exports = {
    write,
    createWriteStream: jest.fn().mockReturnValue({ write })
};