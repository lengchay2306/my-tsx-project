import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AllClaims = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <p>All claims functionality will be restored after full conversion.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllClaims;