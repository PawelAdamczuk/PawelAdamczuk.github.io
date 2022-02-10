---
title: 'Windows explorer won''t refresh automatically after SumatraPDF install'
---

After installing SumatraPDF, this issue occurs:

- right click in folder
- New
- Folder
- nothing happens
- click F5
- New Folder appears and name editing engages

This is because of these shell extensions:

<div markdown="0">
  <h3>Shell Extensions List</h3><br>
  <h4>Created by using <a href="http://www.nirsoft.net/" target="newwin">ShellExView</a></h4>
  <table border="1" cellpadding="5">
    <tr bgcolor="#E0E0E0">
      <th>Extension Name</th>
      <th>Disabled</th>
      <th>Type</th>
      <th>Description</th>
      <th>Version</th>
      <th>Product Name</th>
      <th>Company</th>
      <th>My Computer</th>
      <th>Desktop</th>
      <th>Control Panel</th>
      <th>My Network Places</th>
      <th>Entire Network</th>
      <th>Remote Computer</th>
      <th>Filename</th>
      <th>CLSID</th>
      <th>File Created Time</th>
      <th>CLSID Modified Time</th>
      <th>Microsoft</th>
      <th>File Extensions</th>
      <th>File Attributes</th>
      <th>File Size</th>
      <th>.NET Extension</th>
      <th>Digital Signature</th>
      <th>Missing File</th>
    </tr>
    <tr>
      <td bgcolor="#FFFFF0" nowrap>SumatraPDF Preview (*.pdf)</td>
      <td bgcolor="#FFFDF0" nowrap>Yes</td>
      <td bgcolor="#FFFCF0" nowrap>Preview Handler</td>
      <td bgcolor="#FFFBF0" nowrap>SumatraPDF Preview Shell Extension</td>
      <td bgcolor="#FFF9F0" nowrap>3.3.3</td>
      <td bgcolor="#FFF8F0" nowrap>SumatraPDF</td>
      <td bgcolor="#FFF7F0" nowrap>&nbsp;</td>
      <td bgcolor="#FFF5F0" nowrap>No</td>
      <td bgcolor="#FFF4F0" nowrap>No</td>
      <td bgcolor="#FFF3F0" nowrap>No</td>
      <td bgcolor="#FFF1F0" nowrap>No</td>
      <td bgcolor="#FFF0F0" nowrap>No</td>
      <td bgcolor="#FEF0F0" nowrap>No</td>
      <td bgcolor="#FDF0F1" nowrap>C:\Users\pawel.adamczuk\AppData\Local\SumatraPDF\PdfPreview.dll</td>
      <td bgcolor="#FBF0F3" nowrap>{3D3B1846-CC43-42AE-BFF9-D914083C2BA3}</td>
      <td bgcolor="#FAF0F4" nowrap>9/8/2021 8:32:47 AM</td>
      <td bgcolor="#F9F0F5" nowrap>9/8/2021 8:33:03 AM</td>
      <td bgcolor="#F7F0F7" nowrap>No</td>
      <td bgcolor="#F6F0F8" nowrap>.pdf</td>
      <td bgcolor="#F5F0F9" nowrap>A</td>
      <td bgcolor="#F3F0FB" nowrap>749,568</td>
      <td bgcolor="#F2F0FC" nowrap>No</td>
      <td bgcolor="#F1F0FD" nowrap>&nbsp;</td>
      <td bgcolor="#F0F0FF" nowrap>No</td>
    </tr>
    <tr>
      <td bgcolor="#FFFFF0" nowrap>SumatraPDF Preview (*.pdf)</td>
      <td bgcolor="#FFFDF0" nowrap>Yes</td>
      <td bgcolor="#FFFCF0" nowrap>Thumbnail Handler</td>
      <td bgcolor="#FFFBF0" nowrap>SumatraPDF Preview Shell Extension</td>
      <td bgcolor="#FFF9F0" nowrap>3.3.3</td>
      <td bgcolor="#FFF8F0" nowrap>SumatraPDF</td>
      <td bgcolor="#FFF7F0" nowrap>&nbsp;</td>
      <td bgcolor="#FFF5F0" nowrap>No</td>
      <td bgcolor="#FFF4F0" nowrap>No</td>
      <td bgcolor="#FFF3F0" nowrap>No</td>
      <td bgcolor="#FFF1F0" nowrap>No</td>
      <td bgcolor="#FFF0F0" nowrap>No</td>
      <td bgcolor="#FEF0F0" nowrap>No</td>
      <td bgcolor="#FDF0F1" nowrap>C:\Users\pawel.adamczuk\AppData\Local\SumatraPDF\PdfPreview.dll</td>
      <td bgcolor="#FBF0F3" nowrap>{3D3B1846-CC43-42AE-BFF9-D914083C2BA3}</td>
      <td bgcolor="#FAF0F4" nowrap>9/8/2021 8:32:47 AM</td>
      <td bgcolor="#F9F0F5" nowrap>9/8/2021 8:33:03 AM</td>
      <td bgcolor="#F7F0F7" nowrap>No</td>
      <td bgcolor="#F6F0F8" nowrap>.pdf</td>
      <td bgcolor="#F5F0F9" nowrap>A</td>
      <td bgcolor="#F3F0FB" nowrap>749,568</td>
      <td bgcolor="#F2F0FC" nowrap>No</td>
      <td bgcolor="#F1F0FD" nowrap>&nbsp;</td>
      <td bgcolor="#F0F0FF" nowrap>No</td>
    </tr>
  </table>
</div>

Disabling them using [ShellExView](https://www.nirsoft.net/utils/shexview.html) fixes the issue.