class Number {

    // really bad currency parser :)
    parseCurrency(value) {
        value = value.toFixed(2)

        return "$" + value
    }

    // shortens a number and adds a suffix
    parseNumber(value, fixed) {
        var ranges = [
          { divider: 1e18 , suffix: 'P' },
          { divider: 1e15 , suffix: 'E' },
          { divider: 1e12 , suffix: 'T' },
          { divider: 1e9 , suffix: 'G' },
          { divider: 1e6 , suffix: 'M' },
          { divider: 1e3 , suffix: 'k' }
        ]

        for (var i = 0; i < ranges.length; i++) {
            if (value >= ranges[i].divider) {
              return (value / ranges[i].divider).toFixed(fixed).toString() + ranges[i].suffix
            }
        }
        return value.toString()
    }


}

export default new Number
