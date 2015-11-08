import Request from 'superagent'

class stem {

    // supplied request
    getDashboardData(callback) {
        Request
            .get('http://private-ea502-stemv1.apiary-mock.com/v1/dashboard')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ')
            .end(callback);
    }

}

export default new stem
